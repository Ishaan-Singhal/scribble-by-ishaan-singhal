import React from "react";

import { Accordion } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Menu = ({ categories }) => {
  const SHOW_MENU = true;

  return (
    <MenuBar showMenu={SHOW_MENU}>
      <Accordion defaultActiveKey={0}>
        {categories.map(category => (
          <Accordion.Item key={category.id} title={category.title}>
            {category.articles.map(article => (
              <div
                className="m-2 cursor-pointer"
                key={article.id}
                onClick={() => {}}
              >
                {article.title}
              </div>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </MenuBar>
  );
};

export default Menu;
