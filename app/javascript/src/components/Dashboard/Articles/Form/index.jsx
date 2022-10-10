import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Down } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import { ARTICLES_VALIDATION, CATEGORIES } from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ article }) => {
  const [isDraft, setIsDraft] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_VALIDATION}
    >
      <FormikForm className="w-7/12 p-4">
        <div className="m-2 grid grid-cols-3 gap-4">
          <Input
            required
            className="col-span-2"
            label="Article Title"
            name="title"
            placeholder="Enter Title"
          />
          <Select
            required
            className="col-span-1"
            label="Category"
            name="category"
            placeholder="Select a Category"
            options={CATEGORIES.map(category => ({
              value: category.id,
              label: category.title,
            }))}
          />
        </div>
        <Textarea
          className="m-2"
          label="Article Body"
          name="body"
          placeholder="Enter Description"
          rows="20"
        />
        <div className="m-2 flex">
          <div className="flex p-2">
            <Button
              className="mx-1"
              label={isDraft ? "Save Draft" : "Publish"}
              type="submit"
              onClick={() => setSubmitted(true)}
            />
            <Dropdown icon={Down}>
              <Menu>
                <MenuItem.Button onClick={() => setIsDraft(true)}>
                  Draft
                </MenuItem.Button>
                <MenuItem.Button onClick={() => setIsDraft(false)}>
                  Publish
                </MenuItem.Button>
              </Menu>
            </Dropdown>
          </div>
          <Button label="Cancel" style="text" type="reset" />
        </div>
      </FormikForm>
    </Formik>
  );
};

export default Form;
