Rails.application.routes.draw do
  resources :sessions
  resources :users, only: [:show, :create, :update]
  resources :events
  resources :chefs
  resources :customers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/auth", to: "users#show"
  get "/showsessions", to: "sessions#index"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/events", to: "events#create"
  patch "/updateuser", to: "users#update"
  patch "/updatecustomer", to: "customers#update"
  delete "/logout", to: "sessions#destroy"
  delete "/events", to: "events#destroy"
end
