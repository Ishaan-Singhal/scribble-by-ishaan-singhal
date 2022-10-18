# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit show], param: :id
    delete "/categories/delete/:curr_id/:destination_id", to: "categories#move_and_delete"
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
