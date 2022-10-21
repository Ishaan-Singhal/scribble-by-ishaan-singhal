# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validate :check_both_input_not_same
  validate :check_loop_redirection_not_exist

  private

    def check_both_input_not_same
      errors.add(:base, t("redirection.same_path")) if from == to
    end

    def check_loop_redirection_not_exist
      next_path = to
      while (destination = Redirection.find_by(from: next_path))
        if destination.to === from
          errors.add(:base, t("redirection_loop"))
          break
        end
        next_path = destination.to
      end
    end
end
