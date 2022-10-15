# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles, id: :uuid do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.string :status, default: "draft", null: false
      t.timestamps
    end
  end
end
