import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Typography, Select, Button, Callout, Toastr } from "neetoui";

import categoriesApi from "apis/categories";

const DeleteModal = ({
  showDeleteAlert,
  deleteCategory,
  categories,
  setShowDeleteAlert,
  fetchCategories,
}) => {
  const [destinationCategory, setDestinationCategory] = useState("");

  const getCategoryOptionList = () => {
    const availableCategory = categories.filter(
      category => category.id !== deleteCategory?.id
    );

    return availableCategory.map(category => ({
      value: category.id,
      label: category.title,
    }));
  };

  const moveCategoryAndDelete = async () => {
    try {
      if (categories.length === 1) {
        await categoriesApi.update({
          id: deleteCategory.id,
          payload: { title: "General" },
        });
      } else {
        if (destinationCategory.value) {
          await categoriesApi.destroy({
            id: deleteCategory.id,
            payload: { destination_id: destinationCategory.value },
          });
        } else {
          Toastr.error("No category selected to move articles.");
        }
      }
      await fetchCategories();
      setShowDeleteAlert(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showDeleteAlert} onClose={() => setShowDeleteAlert(false)}>
      <Modal.Header>
        <Typography style="h2">Delete Category</Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography lineHeight="normal" style="body1">
          You are permanently deleting the {`${deleteCategory?.title} `}
          category. This action cannot be undone. Are you sure you wish to
          continue?
        </Typography>
        <Callout icon={Warning} style="danger">
          {categories.length > 1 ? (
            <div className="text-base">
              Category {deleteCategory?.title} has{` ${deleteCategory?.count} `}
              article(s). Before this category can be deleted, these articles
              need to be moved to another category.
            </div>
          ) : (
            <div className="text-base">
              Move all articles to General category.
            </div>
          )}
        </Callout>
        {categories.length > 1 && (
          <div className="mt-4">
            <Select
              required
              label="Select a category to move these articles into"
              options={getCategoryOptionList()}
              onChange={cat => setDestinationCategory(cat)}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Proceed"
          style="danger"
          onClick={() => moveCategoryAndDelete()}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowDeleteAlert(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
