# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]

  def index
    articles = Article.all
    @all_articles = articles
    @draft_articles = articles.draft
    @published_articles = articles.published
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Article was successfully created!")
  end

  def show
    render
  end

  def update
    article = Article.find_by!(slug: params[:slug])
    article.update!(article_params)
    respond_with_success("Article was successfully updated!")
  end

  def destroy
    @article.destroy!
    respond_with_json
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :content, :status)
    end
end
