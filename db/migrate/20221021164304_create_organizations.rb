# frozen_string_literal: true

class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :name, null: false
      t.string :password_digest
      t.string :authentication_token
      t.boolean :password_enabled, default: false, null: false
      t.timestamps
    end
  end
end
