Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]

  get '/decks', to: 'static_pages#show'
  get '/decks/:id/edit', to: 'static_pages#show'
  get '/decks/:id/practice', to: 'static_pages#show'

  resource :static_pages, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :show, :create, :update]
      resources :users do
        collection do
          get 'current'
        end
      end
    end
  end

  root to: "static_pages#show"
end
