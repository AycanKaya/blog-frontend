import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.css";
import { get } from "../../../api/axios";
import SetApprove from "./SetApprove";

interface IPost {
  postId: number;
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

const SettingPosts: React.FC = () => {
  const [rowArray, setRowArray] = useState<IRow[]>([]);

  function getAllUserInfo() {
    get("/EditorUser/GetPassivePosts").then((response: any) => {
      console.log(response);
      setRowArray(response.posts);
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
      width: 150,
      cellRenderer: (params: any) => {
        return params.data.authorName;
      },
    },
    {
      field: "title",
      width: 180,
      cellRenderer: (params: any) => {
        return params.data.title;
      },
    },
    {
      field: "content",
      wrapText: true,
      autoHeight: true,
      width: 600,
      cellRenderer: (params: any) => {
        return params.data.content;
      },
    },
    {
      field: "isApprove",
      width: 200,
      cellRenderer: (params: any) => {
        return SetApprove(params.data, { getAllUserInfo });
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
