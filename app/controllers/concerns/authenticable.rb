# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  private

    def authenticate_org_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(
        @organization.authentication_token,
        auth_token)

      unless @organization && is_valid_token
        respond_with_error(t("organization.could_not_auth"), :unauthorized)
      end
    end

    def is_authenticable
      @organization.is_password_enabled
    end
end
