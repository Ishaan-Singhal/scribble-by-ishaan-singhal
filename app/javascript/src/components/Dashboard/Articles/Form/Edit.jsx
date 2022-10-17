import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Form from ".";

const Edit = ({ history }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const onClose = () => {
    history.push("/");
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchArticleDetails = async () => {
    try {
      setPageLoading(true);
      const response = await articlesApi.show(slug);
      setArticle(response.data.article);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      setPageLoading(true);
      await Promise.all([fetchCategories(), fetchArticleDetails()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Form
        isEdit
        article={article}
        categories={categories}
        closeForm={onClose}
      />
    </div>
  );
};

export default Edit;
