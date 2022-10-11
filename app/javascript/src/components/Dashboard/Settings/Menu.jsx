import React from "react";

import { MenuBar } from "neetoui/layouts";

const Menu = () => {
  const SHOW_MENU = true;

  return (
    <MenuBar showMenu={SHOW_MENU} title="Settings">
      <MenuBar.Item
        active
        description="Page Title, Brand Name & Meta Descriptions "
        label="General"
      />
      <MenuBar.Item
        description="Create and configure redirection rules"
        label="Redirections"
      />
      <MenuBar.Item
        description="Edit & Reorder KB structure"
        label="Manage Categories"
      />
    </MenuBar>
  );
};

export default Menu;
