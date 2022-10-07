import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { CATEGORIES } from "./constants";

const Menu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const SHOW_MENU = true;

  return (
    <MenuBar showMenu={SHOW_MENU} title="Articles">
      <MenuBar.Block active count={13} label="All" />
      <MenuBar.Block count={2} label="Draft" />
      <MenuBar.Block count={7} label="Published" />
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
      {CATEGORIES.map(category => (
        <MenuBar.Block
          count={category.count}
          key={category.id}
          label={category.title}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
