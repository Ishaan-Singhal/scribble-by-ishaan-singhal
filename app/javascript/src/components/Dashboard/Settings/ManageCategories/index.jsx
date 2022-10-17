import React, { useState, useEffect } from "react";

import { Plus, Right, Close, Check } from "neetoicons";
import { Typography, Button, Input, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import categoriesApi from "apis/categories";

import List from "./List";

const ManageCategory = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoriesList(response.data.categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title: newCategory });
      setAddCategory(false);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Header className="border-b border-gray-200" title="Manage Categories" />
      <div className="mx-auto flex h-full max-w-xl flex-col justify-start p-2">
        <Typography style="body1">
          Create and configure the categories inside your scribble
        </Typography>
        <Button
          className="m-4 text-indigo-500"
          icon={Plus}
          label="Add New Category"
          style="link"
          onClick={() => setAddCategory(true)}
        />
        {addCategory && (
          <div className="flex w-full justify-between">
            <div className="flex">
              <Right size={24} />
              <Input
                value={newCategory}
                onChange={e => {
                  setNewCategory(e.target.value);
                }}
              />
            </div>
            <div className="flex">
              <Button
                className="mr-4"
                icon={Check}
                style="text"
                onClick={() => createCategory()}
              />
              <Button
                icon={Close}
                style="text"
                onClick={() => setAddCategory(false)}
              />
            </div>
          </div>
        )}
        {categoriesList.length > 0 && (
          <List categories={categoriesList} fetchCategories={fetchCategories} />
        )}
      </div>
    </Container>
  );
};

export default ManageCategory;
