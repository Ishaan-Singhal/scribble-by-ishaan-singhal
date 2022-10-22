# frozen_string_literal: true

class Public::ArticlesController < ApplicationController
  before_action :load_organization, only: :show
  before_action :authenticate_org_using_x_auth_token, only: :show, if: :is_authenticable
  before_action :load_article, only: :show

  def show
    render
  end

  private

    def load_article
      @article = Article.find_by(slug: params[:slug])
      unless @article
        handle_record_not_found(t("not_found", entity: "Article"))
      end
    end
end
