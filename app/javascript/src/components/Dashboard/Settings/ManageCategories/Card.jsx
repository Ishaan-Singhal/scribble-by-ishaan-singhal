import React from "react";

import { Right, Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

const Card = ({ title }) => (
  <div className="flex w-full justify-between">
    <div className="flex">
      <Right size={24} />
      <Typography style="body1">{title}</Typography>
    </div>
    <div className="flex">
      <Button className="mr-4" icon={Edit} style="text" onClick={() => {}} />
      <Button icon={Delete} style="text" onClick={() => {}} />
    </div>
  </div>
);

export default Card;
