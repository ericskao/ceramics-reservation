class EventAvailabilitiesController < ApplicationController
  before_action :event

  def create
    ActiveRecord::Base.transaction do
      availability = event.event_availabilities.create!(
        from: from,
        to: to,
        user: current_user
      )
      event.update!(common_times: CommonTimesFinder.new(event: event).call)
    end
    respond_to do |format|
      format.html { 
        flash[:success] = "Availability added successfully" 
        redirect_to event_path(event)
      }
      format.json {
        render json: { event: EventSerializer.new(event).serializable_hash }
      }
    end
  rescue => e
    respond_to do |format|
      format.html { 
        flash[:error] = e.to_s 
        redirect_to event_path(event)
      }
      format.json {
        render json: { error: e.to_s }, status: :unprocessable_entity
      }
    end
  end

  private

  def from
    availability_params['from'].present? ? 
      Time.zone.parse(availability_params['from']) :
      Time.zone.parse("#{availability_params['date']} #{availability_params['from(4i)']}:#{availability_params['from(5i)']}")
  end

  def to
    availability_params['to'].present? ? 
      Time.zone.parse(availability_params['to']) :
      Time.zone.parse("#{availability_params['date']} #{availability_params['to(4i)']}:#{availability_params['to(5i)']}")
  end

  def availability_params
    params.permit('date', 'from(4i)', 'from(5i)', 'to(4i)', 'to(5i)', 'from', 'to')
  end

  def event
    @event ||= Event.find_by!(code: params[:event_id])
  end
end