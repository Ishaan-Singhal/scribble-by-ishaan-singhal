import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Button, Input } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import Card from "./Card";

const List = ({ categories, fetchCategories }) => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: categoryId,
        payload: {
          title: categoryTitle,
        },
      });
      setCategoryId("");
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const updatePosition = async ({ id, position }) => {
    try {
      await categoriesApi.update({
        id,
        payload: {
          position,
        },
      });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  // const destroyCategory = async (categoryId) => {
  //   try {
  //     await categoriesApi.destroy(categoryId);
  //     await fetchCategories();
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    updatePosition({
      id: result.draggableId,
      position: result.destination.index + 1,
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, position) => (
              <Draggable
                draggableId={category.id}
                index={position}
                key={category.id}
              >
                {provided => (
                  <li
                    key={category.id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {categoryId !== category.id ? (
                      <Card
                        category={category}
                        setCategoryId={setCategoryId}
                        setCategoryTitle={setCategoryTitle}
                      />
                    ) : (
                      <div className="flex w-full justify-between">
                        <div className="flex">
                          <Input
                            value={categoryTitle}
                            onChange={e => setCategoryTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex">
                          <Button
                            className="mr-4"
                            icon={Check}
                            style="text"
                            onClick={() => updateCategory()}
                          />
                          <Button
                            icon={Close}
                            style="text"
                            onClick={() => setCategoryId("")}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
