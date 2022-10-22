# frozen_string_literal: true

class User < ApplicationRecord
  MAXIMUM_NAME_LENGTH = 30
  MAXIMUM_EMAIL_LENGTH = 50
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. :a-z]+)*\.[a-z]+\z/i.freeze

  has_many :articles
  belongs_to :organization

  validates :name, presence: true, length: { maximum: MAXIMUM_NAME_LENGTH }
  validates :email, presence: true, length: { maximum: MAXIMUM_EMAIL_LENGTH }, format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
