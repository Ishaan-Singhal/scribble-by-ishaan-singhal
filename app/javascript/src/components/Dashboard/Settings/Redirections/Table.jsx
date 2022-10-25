import React, { useState } from "react";

import { Check, Close, Delete, Edit } from "neetoicons";
import { Table as NeetoUITable, Button, Typography, Input } from "neetoui";

import redirectionsApi from "apis/redirections";

import { REDIRECTION_INITIAL_VALUES } from "../constants";

const Table = ({ redirections, fetchRedirections }) => {
  const LOCALE = {
    emptyText: "No redirections added yet",
  };

  const [rowData, setRowData] = useState(REDIRECTION_INITIAL_VALUES);
  const [editId, setEditId] = useState(0);

  const updateRedirection = async () => {
    try {
      await redirectionsApi.update({
        id: rowData.id,
        payload: {
          id: rowData.id,
          from:
            rowData.from.charAt(0) === "/" ? rowData.from : `/${rowData.from}`,
          to: rowData.to.charAt(0) === "/" ? rowData.to : `/${rowData.to}`,
        },
      });
      setEditId(0);
      fetchRedirections();
    } catch (error) {
      logger.error(error);
    }
  };

  const columnData = [
    {
      title: "From Path",
      dataIndex: "from",
      key: "from",
      width: "40%",
      render: (from, redirectObj) =>
        editId === redirectObj.id ? (
          <Input
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
                updateRedirection();
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
                  from: redirectObj.from,
                  to: redirectObj.to,
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
      locale={LOCALE}
      rowData={redirections}
      pagination={{
        defaultPageSize: 10,
      }}
    />
  );
};

export default Table;
