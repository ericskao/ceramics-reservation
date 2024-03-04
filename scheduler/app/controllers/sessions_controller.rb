class SessionsController < ApplicationController
  def omniauth
    ActiveRecord::Base.transaction do
      authentication = Authentication.find_or_create_by!(uid: auth['uid'], provider: auth['provider'], email: auth['info']['email'])
      unless authentication.user
        user = User.create!(
          first_name: auth['info']['first_name'],
          last_name: auth['info']['last_name'],
          password: SecureRandom.hex(32)
        )
        user.authentications << authentication
      end

      session[:user_id] = authentication.reload.user.id

      redirect_to events_path
    end
  end

  def new
  end

  def create
    auth_code = AuthCode.find_by(code: params[:code].upcase)

    if auth_code&.active?
      user = auth_code.user
      user.temp = false if user.temp?
      user.first_name = params[:first_name].capitalize if params[:first_name].present?
      user.last_name = params[:last_name].capitalize if params[:last_name].present?
      ActiveRecord::Base.transaction do
        user.save!
        auth_code.update!(verified_at: Time.zone.now)
      end
      session[:user_id] = auth_code.user.id
      redirect_to events_path and return
    elsif auth_code.blank?
      flash[:error] = 'Invalid code'
    elsif auth_code.verified_at.present?
      flash[:error] = 'Code has already been used'
    elsif auth_code.expires_at >= Time.zone.now
      flash[:error] = 'Code has expired'
    else
      flash[:error] = 'Unknown error'
    end
    redirect_to login_view_path
  end

  def send_auth_code
    if params[:phone_number].blank?
      flash[:error] = 'Phone number cannot be blank'
      redirect_to login_view_path and return
    end

    if Phonelib.invalid_for_country?(params[:phone_number], 'US')
      flash[:error] = 'Phone number is invalid'
      redirect_to login_view_path and return
    end

    normalized_phone = Phonelib.parse(params[:phone_number]).full_e164
    existing_user = User.find_by(phone_number: normalized_phone)

    if current_user.present?
      # Existing user created an event without logging in.
      if existing_user.present? && existing_user != current_user
        existing_events_count = existing_user.events.count
        current_user.events.each_with_index do |event, index| 
          event.update!(user_id: existing_user.id, title: "Event #{existing_events_count + index + 1}")
        end
        current_user.delete # Calling destroy also deletes the events.
        session[:user_id] = existing_user.id
        user = existing_user
      else
        current_user.update!(phone_number: normalized_phone) if current_user.phone_number != normalized_phone
        user = current_user
      end
    else
      user = existing_user || User.create!(phone_number: normalized_phone, password: SecureRandom.hex(32), temp: true)
      session[:user_id] = user.id
    end
    
    auth_code = user.auth_codes.create!
    session[:user_id] = user.id
    
    SendSms.new(to: params[:phone_number], message: "Please use this code to verify your account: #{auth_code.code}").call

    redirect_to verify_auth_code_path
  rescue => e
    flash[:error] = "Oops. Something went wrong. #{e.message}"
    redirect_to login_view_path
  end

  def verify_auth_code
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_url
  end

  private

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end