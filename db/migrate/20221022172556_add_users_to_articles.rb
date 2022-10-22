# frozen_string_literal: true

class AddUsersToArticles < ActiveRecord::Migration[6.1]
  def change
    add_reference :articles, :user, foreign_key: true, type: :uuid
    add_reference :users, :organization, foreign_key: true, type: :uuid
  end
end
