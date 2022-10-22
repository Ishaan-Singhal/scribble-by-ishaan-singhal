# frozen_string_literal: true

module LoadOrganization
  extend ActiveSupport::Concern

  private

    def load_organization
      @organization = Organization.first
      unless @organization
        handle_record_not_found(t("not_found", entity: "Organization"))
      end
    end
end
