import React from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { monthDateFormatter } from "utils/date";

import { ARTICLES } from "./constants";
import { renderActionButtons } from "./utils";

const Table = ({ isColumnVisible }) => {
  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: title => (
        <Typography className="text-indigo-500" weight="bold">
          {title}
        </Typography>
      ),
      hidden: isColumnVisible.title,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: monthDateFormatter,
      hidden: isColumnVisible.createdAt,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "15%",
      hidden: isColumnVisible.author,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      hidden: isColumnVisible.category,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      hidden: isColumnVisible.status,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: () => renderActionButtons(),
      hidden: isColumnVisible.title,
    },
  ].filter(col => col.hidden);

  return (
    <NeetoUITable allowRowClick columnData={columnData} rowData={ARTICLES} />
  );
};

export default Table;
