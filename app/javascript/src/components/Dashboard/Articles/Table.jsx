import React from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { monthDateFormatter } from "utils/date";

import { renderActionButtons } from "./utils";

const Table = ({
  articleVisible,
  articles,
  isColumnVisible,
  setSelectedSlug,
  setShowAlert,
  handleEdit,
}) => {
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
      dataIndex: "date",
      key: "date",
      width: "15%",
      render: monthDateFormatter,
      hidden: isColumnVisible.createdAt,
    },
    // {
    //   title: "Author",
    //   dataIndex: "author",
    //   key: "author",
    //   width: "15%",
    //   hidden: isColumnVisible.author,
    // },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   width: "20%",
    //   hidden: isColumnVisible.category,
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      hidden: isColumnVisible.status,
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: "10%",
      render: slug =>
        renderActionButtons(slug, setSelectedSlug, setShowAlert, handleEdit),
      hidden: isColumnVisible.title,
    },
  ].filter(col => col.hidden);

  return (
    <NeetoUITable
      allowRowClick
      columnData={columnData}
      rowData={articles[articleVisible.status]}
    />
  );
};

export default Table;
