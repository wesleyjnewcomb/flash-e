Rails.application.routes.draw do
  get 'home/show'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :create, :update]
    end
  end

  root to: "home#show"
end
