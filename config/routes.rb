Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
<<<<<<< Updated upstream
=======

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  post 'api/test', to: 'application#test'
  get '*path', to: "static_pages#frontend_index"

>>>>>>> Stashed changes
end
