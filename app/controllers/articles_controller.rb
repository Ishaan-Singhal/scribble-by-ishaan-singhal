# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_user, only: %i[create]

  def index
    articles = Article.all
    articles = articles.where(category_id: params[:category_ids]) unless params[:category_ids].blank?
    @all_articles = articles
    @draft_articles = articles.draft
    @published_articles = articles.published
  end

  def create
    article = Article.new(article_params.merge(user_id: @current_user.id))
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end
end
