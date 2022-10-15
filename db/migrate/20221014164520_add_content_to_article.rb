# frozen_string_literal: true

class AddContentToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :content, :text
  end
end
