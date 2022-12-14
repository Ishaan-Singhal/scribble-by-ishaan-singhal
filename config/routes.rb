# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit show], param: :id
    resources :redirections, except: %i[new show edit], param: :id
    resource :organization, only: %i[show update]

    namespace :public do
      resource :session, only: :create
      resources :categories, only: :index
      resources :articles, only: :show, param: :slug
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
