# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = build(:article)
    @category = build(:category)
    @user = build(:user)
  end

  def test_article_should_be_valid
    assert @article.valid?
  end

  def test_title_should_be_present
    @article.title = nil
    assert @article.invalid?
    assert_includes @article.errors[:title], t("errors.messages.blank")
  end

  def test_status_should_not_have_invalid_status
    assert_raises ArgumentError do
      @article.status = "abc"
    end
  end

  def test_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end
end
