# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    category
    user
    title { Faker::Book.title }
    content { Faker::Lorem.paragraph }
    status { "published" }
  end
end
