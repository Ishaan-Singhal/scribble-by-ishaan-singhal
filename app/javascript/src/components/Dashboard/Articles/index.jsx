import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import {
  Button,
  Dropdown,
  Checkbox,
  Typography,
  PageLoader,
  Alert,
} from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ARTICLE_COLUMNS } from "./constants";
import Menu from "./Menu";
import Table from "./Table";
import { searchFilter } from "./utils";

import Navbar from "../Navbar";

const { Menu: DropdownMenu } = Dropdown;

const Articles = () => {
  const history = useHistory();
  const [isColumnVisible, setIsColumnVisible] = useState({
    title: true,
    createdAt: true,
    author: true,
    category: true,
    status: true,
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [showArticles, setShowArticles] = useState({
    status: "all",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleEdit = slug => {
    history.push(`articles/${slug}/edit`);
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      logger.info(categories);
      setCategoriesList(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list(selectedCategories);
      logger.info(articles);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchArticles()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy({ slug, quiet: true });
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    } finally {
      setSelectedSlug("");
      setShowAlert(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategories]);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Menu
          articles={articles}
          categories={categoriesList}
          fetchCategories={fetchCategories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setShowArticles={setShowArticles}
          showArticles={showArticles}
        />
        <Container>
          <Header
            actionBlock={
              <>
                <Dropdown
                  buttonStyle="secondary"
                  closeOnSelect={false}
                  label="Columns"
                >
                  <DropdownMenu>
                    {ARTICLE_COLUMNS.map(col => (
                      <Checkbox
                        checked={isColumnVisible[col.columnName]}
                        className="p-2 hover:bg-gray-100"
                        id={col.id}
                        key={col.id}
                        label={col.label}
                        onChange={() =>
                          setIsColumnVisible({
                            ...isColumnVisible,
                            [col.columnName]: !isColumnVisible[col.columnName],
                          })
                        }
                      />
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  icon={Plus}
                  label="Add New Article"
                  onClick={() => {
                    history.push("articles/create");
                  }}
                />
              </>
            }
            searchProps={{
              placeholder: "Search article title",
              onChange: e => {
                setSearchText(e.target.value);
              },
              value: searchText,
            }}
          />
          <SubHeader
            leftActionBlock={
              <Typography component="h4" style="h4">
                {articles[showArticles.status]?.length} Articles
              </Typography>
            }
          />
          <Table
            articles={searchFilter(articles[showArticles.status], searchText)}
            handleEdit={handleEdit}
            isColumnVisible={isColumnVisible}
            selectedCategories={selectedCategories}
            setSelectedSlug={setSelectedSlug}
            setShowAlert={setShowAlert}
          />
          {showAlert && (
            <Alert
              isOpen={showAlert}
              message="Are you sure you want to delete this article?"
              title="You are gonna delete article!"
              onClose={() => setShowAlert(false)}
              onSubmit={() => {
                destroyArticle(selectedSlug);
              }}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Articles;
