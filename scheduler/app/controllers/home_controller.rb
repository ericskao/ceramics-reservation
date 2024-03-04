class HomeController < ApplicationController
  def index
    redirect_to events_path if current_user && !current_user.temp?
  end

  def react
  end
end