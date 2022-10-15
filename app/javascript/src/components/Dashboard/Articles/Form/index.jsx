import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Down } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";

import {
  ARTICLES_VALIDATION,
  CATEGORIES,
  ARTICLE_INITIAL_VALUES,
} from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ closeForm, isEdit, article }) => {
  const [isDraft, setIsDraft] = useState("draft");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    try {
      logger.info(values);
      if (isEdit) {
        await articlesApi.update({
          slug: article.slug,
          payload: {
            title: values.title,
            content: values.content,
            status: isDraft,
          },
        });
      } else {
        await articlesApi.create({
          title: values.title,
          content: values.content,
          status: isDraft,
        });
      }
      closeForm();
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_VALIDATION}
      initialValues={
        isEdit
          ? {
              title: article.title,
              content: article.content,
              category: null,
            }
          : ARTICLE_INITIAL_VALUES
      }
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
            name="content"
            placeholder="Enter Description"
            rows="20"
          />
          <div className="m-2 flex">
            <div className="flex p-2">
              <Button
                className="mx-1"
                disabled={isSubmitting}
                label={isDraft === "draft" ? "Save Draft" : "Publish"}
                loading={isSubmitting}
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown icon={Down}>
                <Menu>
                  <MenuItem.Button onClick={() => setIsDraft("draft")}>
                    Draft
                  </MenuItem.Button>
                  <MenuItem.Button onClick={() => setIsDraft("published")}>
                    Publish
                  </MenuItem.Button>
                </Menu>
              </Dropdown>
            </div>
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={closeForm}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
