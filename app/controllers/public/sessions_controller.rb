# frozen_string_literal: true

class Public::SessionsController < ApplicationController
  before_action :load_organization, only: :create

  def create
    unless @organization.presence.authenticate(session_params[:password])
      respond_with_error(t("organization.incorrect_credentials"))
    end
  end

  private

    def session_params
      params.require(:organization).permit(:password)
    end
end
