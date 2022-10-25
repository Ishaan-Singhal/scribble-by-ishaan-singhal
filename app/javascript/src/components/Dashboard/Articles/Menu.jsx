import React, { useState } from "react";

import { Search, Plus, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";

import { searchFilter } from "./utils";

const Menu = ({
  articles,
  showArticles,
  setShowArticles,
  categories,
  setSelectedCategories,
  selectedCategories,
  fetchCategories,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const capitalize = word =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  const createCategory = async () => {
    try {
      await categoriesApi.create({
        title: newCategory,
      });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setNewCategory("");
    }
  };

  return (
    <MenuBar showMenu title="Articles">
      {Object.keys(articles).map(keyStatus => (
        <MenuBar.Block
          active={keyStatus === showArticles.status}
          count={articles[keyStatus].length}
          key={keyStatus}
          label={capitalize(keyStatus)}
          onClick={() => setShowArticles({ status: keyStatus })}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
          {
            icon: Plus,
            onClick: () => setIsInputCollapsed(collapsed => !collapsed),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        placeholder="Search category title"
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {!isInputCollapsed && (
        <div className="my-2 flex space-x-2">
          <Input
            placeholder="Add new category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                createCategory();
                setIsInputCollapsed(collapsed => !collapsed);
              }
            }}
          />
          <Button
            icon={Plus}
            style="text"
            type="submit"
            onClick={() => {
              createCategory();
              setIsInputCollapsed(collapsed => !collapsed);
            }}
          />
          <Button
            icon={Close}
            style="text"
            type="reset"
            onClick={() => {
              setNewCategory("");
              setIsInputCollapsed(collapsed => !collapsed);
            }}
          />
        </div>
      )}
      {searchFilter(categories, searchTitle).map(category => (
        <MenuBar.Block
          active={selectedCategories.includes(category.id)}
          count={category.count}
          key={category.id}
          label={category.title}
          onClick={() => {
            const idx = selectedCategories.indexOf(category.id);
            idx === -1
              ? setSelectedCategories([...selectedCategories, category.id])
              : setSelectedCategories([
                  ...selectedCategories.slice(0, idx),
                  ...selectedCategories.slice(
                    idx + 1,
                    selectedCategories.length
                  ),
                ]);
          }}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
