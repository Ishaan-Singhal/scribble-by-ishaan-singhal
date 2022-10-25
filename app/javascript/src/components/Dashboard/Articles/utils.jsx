import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";

export const renderActionButtons = (
  slug,
  setSelectedSlug,
  setShowAlert,
  handleEdit
) => (
  <div className="flex flex-row space-x-1">
    <Button
      icon={Delete}
      style="text"
      onClick={() => {
        setSelectedSlug(slug);
        setShowAlert(true);
      }}
    />
    <Button
      icon={Edit}
      style="text"
      onClick={() => {
        handleEdit(slug);
      }}
    />
  </div>
);

export const renderCategoryTitle = category => (
  <Tag label={category.title} style="secondary" />
);

export const renderAuthorName = author => (
  <Typography style="body2">{author.name}</Typography>
);
