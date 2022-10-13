import React from "react";

import { MenuBar } from "neetoui/layouts";

const Menu = ({ settingsLinks, setActiveNavlink }) => {
  const SHOW_MENU = true;

  return (
    <MenuBar showMenu={SHOW_MENU} title="Settings">
      {settingsLinks.map(navlink => (
        <MenuBar.Item
          description={navlink.description}
          key={navlink.key}
          label={navlink.label}
          onClick={() => setActiveNavlink(navlink)}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
