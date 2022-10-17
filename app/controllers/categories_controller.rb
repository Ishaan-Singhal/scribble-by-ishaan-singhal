# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = Category.all
  end

  def create
    category = Category.new!(category_params)
    category.save!
    respond_with_success("Category successfully created")
  end

  def update
    @category.update!(category_params)
    respond_with_success("Updated category successfully")
  end

  def destroy
    @category.destroy!
    respond_with_success("Deleted category successfully")
  end

  private

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def category_params
      params.require(:category).permit(:title)
    end
end
