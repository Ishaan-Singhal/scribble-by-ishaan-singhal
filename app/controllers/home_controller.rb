# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :handle_redirect, only: %i[index]

  def index
    render
  end

  private

    def handle_redirect
      from_path = "/#{params[:path]}"
      redirection = Redirection.find_by(from: from_path)
      if redirection
        redirect_to redirection.to, status: :moved_permanently
      end
    end
end
