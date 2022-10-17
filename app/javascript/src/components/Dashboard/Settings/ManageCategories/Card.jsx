import React from "react";

import { Reorder, Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

const Card = ({ category, setCategoryId, setCategoryTitle }) => (
  <div className="flex w-full justify-between">
    <div className="flex">
      <Reorder size={24} />
      <Typography style="body1">{category.title}</Typography>
    </div>
    <div className="flex">
      <Button
        className="mr-4"
        icon={Edit}
        style="text"
        onClick={() => {
          setCategoryId(category.id);
          setCategoryTitle(category.title);
        }}
      />
      <Button icon={Delete} style="text" onClick={() => {}} />
    </div>
  </div>
);

export default Card;
