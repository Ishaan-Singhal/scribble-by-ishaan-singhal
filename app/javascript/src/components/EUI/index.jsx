import React, { useState, useEffect } from "react";

import { Typography, Tag, Label, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { monthDateFormatter } from "utils/date";

import Menu from "./Menu";
import Navbar from "./Navbar";

const Eui = () => {
  let { slug } = useParams();

  const [categoryList, setCategoryList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      slug = slug || categories[0].articles[0].slug;
      logger.info(slug);
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await articlesApi.show(slug);
      setSelectedArticle(response.data.article);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      await Promise.all([fetchCategories(), fetchArticle()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Menu
          categories={categoryList}
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
        <Container>
          <Typography className="my-2" style="h1">
            {selectedArticle.title}
          </Typography>
          <div className="flex">
            <Tag
              className="mr-4"
              label={selectedArticle.category.title}
              style="info"
            />
            <Label>{monthDateFormatter(selectedArticle.date)}</Label>
          </div>
          <Typography className="my-4" style="body2">
            {selectedArticle.content}
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Eui;
