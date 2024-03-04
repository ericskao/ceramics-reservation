class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :authenticate_user!

  # before_action :whoami
  around_action :switch_time_zone, :if => :current_user

  def switch_time_zone
    Time.use_zone(current_user.timezone) { yield }
  end

  def current_user
    return unless session[:user_id]

    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authenticate_user!
    redirect_to root_url unless current_user && !current_user.temp?
  end

  def whoami
    Rails.logger.warn("="*30)
    Rails.logger.warn("Current user: #{current_user.present? ? (current_user.temp ? 'TEMP USER' : 'NORMAL USER') : 'NOT LOGGED IN'}")
  end
end
