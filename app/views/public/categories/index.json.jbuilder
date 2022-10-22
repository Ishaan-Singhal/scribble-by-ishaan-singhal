json.categories @categories do |category|
  json.extract! category,
    :id,
    :title,
    :position
  json.count category.articles.count
  json.articles category.articles.published do |article|
    json.extract! article,
      :id,
      :slug,
      :title
  end
end
