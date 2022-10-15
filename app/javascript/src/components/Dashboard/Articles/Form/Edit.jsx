import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from ".";

const Edit = ({ history }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const onClose = () => {
    history.push("/");
  };

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  const fetchArticleDetails = async () => {
    try {
      setPageLoading(true);
      const response = await articlesApi.show(slug);
      setArticle(response.data.article);
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
      <Form isEdit article={article} closeForm={onClose} />
    </div>
  );
};

export default Edit;
