import React from "react";

import { Plus } from "neetoicons";
import { Button, Dropdown, Checkbox, Typography } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";

import { ARTICLE_COLUMNS } from "./constants";
import Menu from "./Menu";

const { Menu: DropdownMenu } = Dropdown;

const Articles = () => (
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
                    className="p-2 hover:bg-gray-100"
                    id={col.id}
                    key={col.id}
                    label={col.label}
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
    </Container>
  </div>
);

export default Articles;
