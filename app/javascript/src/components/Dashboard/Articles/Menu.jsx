import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Menu = ({
  articles,
  showArticles,
  setShowArticles,
  categories,
  setSelectedCategories,
  selectedCategories,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const SHOW_MENU = true;
  const capitalize = word =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  return (
    <MenuBar showMenu={SHOW_MENU} title="Articles">
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
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {categories.map(category => (
        <MenuBar.Block
          active={selectedCategories.includes(category.title)}
          count={category.count}
          key={category.id}
          label={category.title}
          onClick={() => {
            const idx = selectedCategories.indexOf(category.title);
            idx === -1
              ? setSelectedCategories([...selectedCategories, category.title])
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
