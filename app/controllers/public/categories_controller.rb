# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  before_action :load_organization, only: :index
  before_action :authenticate_org_using_x_auth_token, only: :index, if: :is_authenticable

  def index
    @categories = Category.all.order("position ASC")
  end
end
