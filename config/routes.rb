Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get "users/search", to: "users#search"
    resources :users, only: [:index, :create, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, only: [:index, :create, :update, :destroy] do 
      resources :comments, only: [:index, :create, :update, :destroy]
    end
  end

  post 'api/test', to: 'application#test'
  get '*path', to: "static_pages#frontend_index"

end
