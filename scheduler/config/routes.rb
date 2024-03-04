Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'login', to: 'sessions#new', as: :login_view
  post 'login', to: 'sessions#create', as: :login
  post 'send_auth_code', to: 'sessions#send_auth_code', as: :send_auth_code
  get 'verify_auth_code', to: 'sessions#verify_auth_code', as: :verify_auth_code
  delete 'logout', to: 'sessions#destroy', as: :logout

  get 'auth/:provider/callback', to: 'sessions#omniauth'

  resources :events do
    resources :event_availabilities, only: [:create, :update, :destroy]
    member do
      post :vote_for_time
    end
  end

  get '/react', to: 'home#react'

  root "home#index"
end
