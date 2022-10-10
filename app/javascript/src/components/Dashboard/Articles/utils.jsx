import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button } from "neetoui";

export const renderActionButtons = () => (
  <div className="flex flex-row space-x-1">
    <Button icon={Delete} style="text" />
    <Button icon={Edit} style="text" />
  </div>
);
