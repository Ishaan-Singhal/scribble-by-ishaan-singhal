json.id article.id
json.title article.title
json.slug article.slug
json.content article.content
json.date article.created_at.strftime("%B %d, %Y")
json.status article.status
json.category do
  json.extract! article.category,
    :id,
    :title
end
