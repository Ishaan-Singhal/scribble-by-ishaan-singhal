# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :delete_all
  validates :title, presence: true

  acts_as_list
end
