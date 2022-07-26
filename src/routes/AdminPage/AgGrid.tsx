import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get, post, put } from "../../api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import TextCellEditör from "./TextCellEditör";

interface IRow {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  gender: string;
  birthDay: Date;
  age: string;
  phoneNumber: string;
  contry: string;
  address: string;
}

export default function GenerateRows() {
  const [rowArray, setRowArray] = useState<IRow[]>([]);

  function getAllUserInfo() {
    get("/Account/GetAllUserInfo").then((response: IRow[]) => {
      setRowArray(response);
    });
  }

  function updateUser(userId: string, body: string) {
    const url = "/Admin/Dashboard?id=" + userId;
    put(url, body).then((respone: any) => {
      console.log(respone);
    });
  }

  function handleUpdate(params: any) {
    console.log(params);
    const newarray = params;
    const userId = params.userID;
    const { userID, ...requestBody } = newarray;
    updateUser(userId, requestBody);
  }

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const columnDefs = [
    {
      field: "userName",
      editable: true,
      width: 150,
      cellRenderer: (params: any) => {
        return TextCellEditör(params.data);
      },
    },
    { field: "name", width: 125 },
    { field: "surname", editable: true, width: 125 },
    {
      field: "role",
      width: 125,
      editable: true,
      cellRenderer: (params: any) => {
        console.log(params);
        return userRoleCellRenderer(params.data);
      },
    },
    { field: "gender", width: 125 },
    { field: "birthDay", width: 125 },
    { field: "age", width: 90 },
    { field: "phoneNumber", width: 125 },
    { field: "contry", width: 125 },
    { field: "address", width: 125 },
    {
      field: "button",
      cellRenderer: (params: any) => {
        return (
          <Button
            color="secondary"
            onClick={(event: any) => handleUpdate(params.data)}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </Button>
        );
      },
    },
  ];

  const handleChange = (
    event: SelectChangeEvent,
    params: any,
    rowArray: any
  ) => {
    params.role = event.target.value;
    setRowArray(
      rowArray.map((row: any) => {
        if (row.userID === params.userID) {
          return {
            ...row,
            role: event.target.value,
          };
        }
        return row;
      })
    );
  };

  function userRoleCellRenderer(params: any) {
    return (
      <>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id={params.userID}
              value={params.role}
              label="role"
              onChange={(event) => handleChange(event, params, rowArray)}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Basic"}>Basic</MenuItem>
              <MenuItem value={""}>''</MenuItem>
            </Select>
          </FormControl>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowHeight={100}
          rowData={rowArray}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
    </>
  );
}
