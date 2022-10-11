import React, { useState } from "react";

import { Check, Close, Delete, Edit } from "neetoicons";
import { Table as NeetoUITable, Button, Typography, Input } from "neetoui";

import { REDIRECTION_INITIAL_VALUES, REDIRECTION_VALUES } from "../constants";

const Table = () => {
  const [rowData, setRowData] = useState(REDIRECTION_INITIAL_VALUES);
  const [editId, setEditId] = useState(0);
  const CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE = 10;

  const columnData = [
    {
      title: "From Path",
      dataIndex: "from",
      key: "from",
      width: "40%",
      render: (from, redirectObj) =>
        editId === redirectObj.id ? (
          <Input
            prefix="/"
            value={rowData.from}
            onChange={e => setRowData({ ...rowData, from: e.target.value })}
          />
        ) : (
          <Typography style="body3">{from}</Typography>
        ),
    },
    {
      title: "To Path",
      dataIndex: "to",
      key: "to",
      width: "40%",
      render: (to, redirectObj) =>
        editId === redirectObj.id ? (
          <Input
            prefix="/"
            value={rowData.to}
            onChange={e => setRowData({ ...rowData, to: e.target.value })}
          />
        ) : (
          <Typography style="body3">{to}</Typography>
        ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      width: "20%",
      render: (id, redirectObj) =>
        editId === id ? (
          <>
            <Button
              className="mr-4"
              icon={Check}
              style="text"
              onClick={() => {
                setRowData({
                  id: redirectObj.id,
                  from: redirectObj.from,
                  to: redirectObj.to,
                });
              }}
            />
            <Button
              icon={Close}
              style="text"
              onClick={() => {
                setEditId(0);
              }}
            />
          </>
        ) : (
          <>
            <Button
              className="mr-4"
              icon={Edit}
              style="text"
              onClick={() => {
                setEditId(redirectObj.id);
                setRowData({
                  id: redirectObj.id,
                  from: redirectObj.from.substring(1),
                  to: redirectObj.to.substring(1),
                });
              }}
            />
            <Button
              icon={Delete}
              style="text"
              onClick={() => {
                // destroyRedirection(redirectObj.key);
              }}
            />
          </>
        ),
    },
  ];

  return (
    <NeetoUITable
      columnData={columnData}
      currentPageNumber={CURRENT_PAGE_NUMBER}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      rowData={REDIRECTION_VALUES}
    />
  );
};

export default Table;
