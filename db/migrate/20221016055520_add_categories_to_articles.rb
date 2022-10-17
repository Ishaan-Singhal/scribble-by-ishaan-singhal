# frozen_string_literal: true

class AddCategoriesToArticles < ActiveRecord::Migration[6.1]
  def change
    add_reference :articles, :category, foreign_key: true, type: :uuid
  end
end
