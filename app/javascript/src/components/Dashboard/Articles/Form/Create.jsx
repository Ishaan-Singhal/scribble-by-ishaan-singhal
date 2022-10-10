import React from "react";

import Form from ".";

import { ARTICLE_INITIAL_VALUES } from "../constants";

const Create = () => (
  <div className="flex justify-center">
    <Form article={ARTICLE_INITIAL_VALUES} />
  </div>
);

export default Create;
