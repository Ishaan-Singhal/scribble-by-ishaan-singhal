import React from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import Menu from "./Menu";

const Articles = () => (
  <div className="flex">
    <Menu />
    <Container>
      <Header
        actionBlock={<Button icon={Plus} label="Add New Article" />}
        searchProps={{
          onChange: () => {},
          value: "",
        }}
      />
    </Container>
  </div>
);

export default Articles;
