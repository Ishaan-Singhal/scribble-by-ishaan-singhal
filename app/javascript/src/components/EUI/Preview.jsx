import React, { useState, useEffect } from "react";

import { Typography, Tag, Label, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { useHistory, useParams } from "react-router-dom";

import euiArticlesApi from "apis/eui/articles";
import euiCategoriesApi from "apis/eui/categories";
import { monthDateFormatter } from "utils/date";

import Menu from "./Menu";

const Preview = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await euiCategoriesApi.list();
      if (!slug) {
        history.push(`/public/${categories[0]?.articles[0]?.slug}`);
      }
      logger.info(slug);
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await euiArticlesApi.show(slug);
      setSelectedArticle(response.data.article);
      logger.info(response.data.article);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    slug && fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <Menu categories={categoryList} selectedArticle={selectedArticle} />
      <Container>
        {selectedArticle?.title ? (
          <>
            <Typography className="my-2" style="h1">
              {selectedArticle?.title}
            </Typography>
            <div className="flex">
              <Tag
                className="mr-4"
                label={selectedArticle?.category.title}
                style="info"
              />
              <Label>{monthDateFormatter(selectedArticle?.date)}</Label>
            </div>
            <Typography className="my-4" style="body2">
              {selectedArticle?.content}
            </Typography>
          </>
        ) : (
          <Typography>No article in this category.</Typography>
        )}
      </Container>
    </div>
  );
};

export default Preview;
