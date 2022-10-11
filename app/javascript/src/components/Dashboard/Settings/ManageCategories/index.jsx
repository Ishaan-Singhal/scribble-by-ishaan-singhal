import React, { useState } from "react";

import { Plus, Right, Close, Check } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import Card from "./Card";

import { CATEGORIES } from "../constants";

const ManageCategory = () => {
  const [category, setCategory] = useState(false);
  const [newCategory, setNewCategory] = useState(null);

  return (
    <Container>
      <Header className="border-b border-gray-200" title="Manage Categories" />
      <div className="mx-auto flex h-full max-w-xl flex-col justify-start p-2">
        <Typography style="body1">
          Create and configure the categories inside your scribble
        </Typography>
        <Button
          className="m-4 text-indigo-500"
          icon={Plus}
          label="Add New Category"
          style="link"
          onClick={() => setCategory(true)}
        />
        {category && (
          <div className="flex w-full justify-between">
            <div className="flex">
              <Right size={24} />
              <Input
                value=""
                onChange={e => {
                  setNewCategory({
                    ...newCategory,
                    to: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex">
              <Button
                className="mr-4"
                icon={Check}
                style="text"
                onClick={() => {}}
              />
              <Button
                icon={Close}
                style="text"
                onClick={() => setCategory(false)}
              />
            </div>
          </div>
        )}
        {CATEGORIES.length > 0 &&
          CATEGORIES.map(cat => <Card key={cat.id} title={cat.title} />)}
      </div>
    </Container>
  );
};

export default ManageCategory;
