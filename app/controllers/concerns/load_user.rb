# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  private

    def load_user
      admin_user_email = "oliver@example.com"
      @current_user = User.find_by(email: admin_user_email)
      unless @current_user
        handle_record_not_found("User")
      end
    end
end