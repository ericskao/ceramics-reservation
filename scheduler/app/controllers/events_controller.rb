class EventsController < ApplicationController
  before_action :authenticate_user!, except: [:new, :create]
  before_action :event, only: [:vote_for_time, :show]

  def index
    all_events = current_user.events.order(expires_on: :asc)
    participating_events = current_user.other_participating_events.order(expires_on: :asc)
    @upcoming_events = all_events.active(current_user)
    @upcoming_participating_events = participating_events.active(current_user)
    @closed_events = (all_events.closed(current_user) + participating_events.closed(current_user)).uniq

    respond_to do |format|
      format.html
      format.json { 
        render json: { 
          upcoming_events: EventSerializer.new(@upcoming_events).serializable_hash,
          upcoming_participating_events: EventSerializer.new(@upcoming_participating_events).serializable_hash,
          closed_events: EventSerializer.new(@closed_events).serializable_hash
        } 
      }
    end
  end

  def new
    # If no user, create a temp user
    if current_user.blank?
      user = User.create!(temp: true, password: SecureRandom.hex(32))
      session[:user_id] = user.id
      current_user
    end

    @event = current_user.events.build
    @event.title = @event.default_title
    @button_text = "Create"
  end

  def vote_for_time
    common_time = params[:common_time]
    @event.common_times_votes[common_time] = (@event.common_times_votes[common_time] || Set.new) << current_user.id
    @event.save!

    respond_to do |format|
      format.turbo_stream {
        render turbo_stream: turbo_stream.replace(
          "common_time_#{common_time}", 
          partial: 'common_time', 
          locals: { 
            common_time: common_time, 
            user_ids: @event.common_times[common_time], 
            user_ids_voted: @event.common_times_votes[common_time] 
          }
        )
      }
      format.json {
        render json: { event: EventSerializer.new(@event).serializable_hash }
      }
    end
  end

  def create
    event_params_hash = event_params.to_h
    event_availabilities_attributes = 
      event_params[:event_availabilities].present? ?
        build_event_availabilities_attributes_with_iso8601(event_params.delete(:event_availabilities)) :
        build_event_availabilities_attributes(event_params_hash.delete(:event_availabilities_attributes) || {})
    event = current_user.events.build(event_params_hash.merge(event_availabilities_attributes: event_availabilities_attributes))

    if event.save
      if current_user.temp?
        redirect_to login_view_path and return
      end

      respond_to do |format|
        format.html { redirect_to event_path(event) }
        format.json { render json: { event: EventSerializer.new(event).serializable_hash } }
      end
    else
      respond_to do |format|
        format.html {
          flash[:error] = event.errors.full_messages.to_sentence
          render :new
        }
        format.json {
          render json: { error: event.errors.full_messages.to_sentence }, status: :unprocessable_entity
        }
      end
    end    
  end

  def show
    @availabilities_by_user = @event.event_availabilities.order(from: :asc).group_by(&:user)
    @participants_length = @event.participants.uniq.length

    respond_to do |format|
      format.html
      format.json {
        render json: {
          event: EventSerializer.new(@event).serializable_hash,
          availabilities_by_user: @availabilities_by_user.map { 
            |user, availabilities| [user.id, EventAvailabilitySerializer.new(availabilities).serializable_hash] 
          }.to_h,
        }
      }
    end
  end

  private 

  def event
    @event = Event.find_by!(code: params[:id])
  end

  def build_event_availabilities_attributes_with_iso8601(attributes_array)
    return {} if attributes_array.blank?

    attributes_array.map do |attributes|
      {
        from: Time.zone.parse(attributes[:from]),
        to: Time.zone.parse(attributes[:to]),
        user: current_user
      }
    end
  end

  def build_event_availabilities_attributes(attributes_hash)
    return {} if attributes_hash.blank?

    attributes_hash.values.map do |availability|
      {
        from: Time.zone.parse("#{availability['date']} #{availability['from(4i)']}:#{availability['from(5i)']}"),
        to: Time.zone.parse("#{availability['date']} #{availability['to(4i)']}:#{availability['to(5i)']}"),
        user: current_user
      }
    end
  end

  def event_params
    params.require(:event).permit(
      :title, 
      :description, 
      :expires_on,
      event_availabilities_attributes: ['id', '_destroy', 'date', 'from(4i)', 'from(5i)', 'to(4i)', 'to(5i)'],
      event_availabilities: [:from, :to]
    )
  end
end