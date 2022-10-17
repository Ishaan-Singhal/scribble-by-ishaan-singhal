import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import Form from ".";

const Create = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const onClose = () => {
    history.push("/");
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex justify-center">
      <Form categories={categories} closeForm={onClose} isEdit={false} />
    </div>
  );
};

export default Create;
