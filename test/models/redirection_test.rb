# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_should_not_be_valid_without_from_path
    @redirection.from = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From can't be blank"
  end

  def test_redirection_should_not_be_valid_without_unique_from_path
    duplicate_redirection = @redirection.dup
    assert_not duplicate_redirection.valid?
    assert_includes duplicate_redirection.errors.full_messages, "From has already been taken"
  end

  def test_from_and_to_should_not_be_same
    @redirection.from = "test"
    @redirection.to = "test"
    assert_not @redirection.valid?
  end

  def test_simple_nested_loop_redirection
    r1 = Redirection.create! from: @redirection.to, to: "redirection_page_1"
    r2 = Redirection.create! from: r1.to, to: "redirection_page_2"
    r3 = Redirection.new from: r2.to, to: @redirection.from
    assert_not r3.valid?
  end
end
