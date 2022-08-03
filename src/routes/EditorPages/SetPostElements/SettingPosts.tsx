import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.css";
import { get } from "../../../api/axios";
import SetApprove from "./SetApprove";

interface IPost {
  id: number;
  title: string;
  content: string;
  isApprove: boolean;
  authorID: string;
  createTime: Date;
  updateTime: Date;
}

interface IRow {
  authorName: string;
  authorEmail: string;
  post: IPost;
}

const SettingPosts = () => {
  const [rowArray, setRowArray] = useState<IRow[]>([]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  function getAllUserInfo() {
    get("/EditorUser/GetPassivePosts").then((response: IRow[]) => {
      setRowArray(response);
    });
  }
  useEffect(() => {
    getAllUserInfo();
  }, []);

  const defaultColDef = {
    width: 170,
    sortable: true,
    editable: false,
    resizable: true,
    filter: true,
    cellStyle: {
      fontSize: "12px",

      justifyContent: "center",
      alignItems: "center",
    },
  };

  const columnDefs = [
    {
      field: "authorEmail",
      width: 150,
      alignItems: "center",

      cellRenderer: (params: any) => {
        return params.data.authorEmail;
      },
    },
    {
      field: "authorName",
      width: 110,
      cellRenderer: (params: any) => {
        return params.data.authorName;
      },
    },
    {
      field: "title",
      width: 170,
      cellRenderer: (params: any) => {
        return params.data.post.title;
      },
    },
    {
      field: "content",
      wrapText: true,
      autoHeight: true,
      width: 500,

      cellRenderer: (params: any) => {
        return params.data.post.content;
      },
    },
    {
      field: "isApprove",
      width: 200,
      cellRenderer: (params: any) => {
        return SetApprove(params.data);
      },
    },
  ];

  return (
    <div style={{ height: "600px", width: "auto" }}>
      <div
        style={{ width: "auto", height: "600px" }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={rowArray}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default SettingPosts;
