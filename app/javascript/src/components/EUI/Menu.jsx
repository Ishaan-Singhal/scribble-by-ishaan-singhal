import React from "react";

import { Accordion } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

const Menu = ({ categories, selectedArticle }) => {
  const SHOW_MENU = true;
  const history = useHistory();

  return (
    <MenuBar showMenu={SHOW_MENU}>
      <Accordion defaultActiveKey={selectedArticle?.category?.position - 1}>
        {categories.map(category => (
          <Accordion.Item key={category.id} title={category.title}>
            {category.articles.map(article => (
              <div
                className="m-2 cursor-pointer"
                key={article.id}
                style={{
                  color:
                    article.id === selectedArticle?.id &&
                    "rgb(var(--neeto-ui-primary-800))",
                }}
                onClick={() => {
                  history.push(`/public/${article.slug}`);
                }}
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
