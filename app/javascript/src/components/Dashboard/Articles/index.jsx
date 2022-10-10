import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Dropdown, Checkbox, Typography } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";

import { ARTICLE_COLUMNS } from "./constants";
import Menu from "./Menu";
import Table from "./Table";

const { Menu: DropdownMenu } = Dropdown;

const Articles = () => {
  const [isColumnVisible, setIsColumnVisible] = useState({
    title: true,
    createdAt: true,
    author: true,
    category: true,
    status: true,
  });

  return (
    <div className="flex">
      <Menu />
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
              <Button icon={Plus} label="Add New Article" />
            </>
          }
          searchProps={{
            onChange: () => {},
            value: "",
          }}
        />
        <SubHeader
          leftActionBlock={
            <Typography component="h4" style="h4">
              118 Articles
            </Typography>
          }
        />
        <Table isColumnVisible={isColumnVisible} />
      </Container>
    </div>
  );
};

export default Articles;
