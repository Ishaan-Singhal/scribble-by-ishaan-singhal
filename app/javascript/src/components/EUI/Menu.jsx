import React from "react";

import { Typography, Accordion } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { CATEGORY_VALUES } from "./constants";

const Menu = () => {
  const SHOW_MENU = true;

  return (
    <MenuBar showMenu={SHOW_MENU}>
      <Accordion defaultActiveKey={0}>
        {CATEGORY_VALUES.map(category => (
          <Accordion.Item key={category.id} title={category.title}>
            {category.articles.map((article, idx) => (
              <Typography className="m-2" key={idx} style="body2">
                {article}
              </Typography>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </MenuBar>
  );
};

export default Menu;
