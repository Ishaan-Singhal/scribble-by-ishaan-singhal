json.articles do
  json.all @all_articles do | all_article |
    json.partial! "articles/article", article: all_article
  end
  
  json.draft @draft_articles do | draft_article |
    json.partial! "articles/article", article: draft_article
  end

  json.published @published_articles do | published_article |
    json.partial! "articles/article", article: published_article
  end

end
