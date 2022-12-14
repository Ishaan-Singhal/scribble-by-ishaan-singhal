# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  private

    def load_user
      admin_user_email = "oliver@example.com"
      @current_user = User.find_by(email: admin_user_email)
      unless @current_user
        respond_with_error("Couldn't find User")
      end
    end
end
