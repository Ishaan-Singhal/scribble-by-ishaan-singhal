# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_LENGTH = 30
  MIN_PASSWORD_LENGTH = 6

  has_one :user

  validates :name, presence: true, length: { maximum: MAX_LENGTH }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password_enabled && password.present? }

  has_secure_password validations: false
  has_secure_token :authentication_token

  def is_password_enabled
    self.password_enabled
  end
end
