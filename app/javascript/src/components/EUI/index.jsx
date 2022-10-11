import React from "react";

import { Typography, Tag, Label } from "neetoui";
import { Container } from "neetoui/layouts";

import { monthDateFormatter } from "utils/date";

import { ARTICLE_DUMMY } from "./constants";
import Menu from "./Menu";
import Navbar from "./Navbar";

const Eui = () => {
  const { title, body, createdAt, category } = ARTICLE_DUMMY;

  return (
    <>
      <Navbar />
      <div className="flex">
        <Menu />
        <Container>
          <Typography className="my-2" style="h1">
            {title}
          </Typography>
          <div className="flex">
            <Tag className="mr-4" label={category} style="info" />
            <Label>{monthDateFormatter(createdAt)}</Label>
          </div>
          <Typography className="my-4" style="body2">
            {body}
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Eui;
