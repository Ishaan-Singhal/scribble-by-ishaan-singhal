# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections, id: :uuid do |t|
      t.string :to
      t.string :from, null: false, index: { unique: true }
      t.timestamps
    end
  end
end
