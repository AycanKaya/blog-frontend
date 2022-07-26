import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get, post, put } from "../../api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";

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

  useEffect(() => {
    getAllUserInfo();
  }, []);

  function convertDate(strDate: string) {
    var year = strDate.substr(0, 4);
    var mounth = strDate.substr(5, 2);
    var day = strDate.substr(8, 2);
    return year + "-" + mounth + "-" + day;
  }

  rowArray?.forEach(function (value) {
    // value.birthDay = convertDate(value.birthDay.toString());
  });

  const columnDefs = [
    { field: "userName", editable: true },
    { field: "name" },
    { field: "surname", editable: true },
    {
      field: "role",
      editable: true,
      cellRenderer: (params: any) => {
        return userRoleCellRenderer(params.data);
      },
    },
    { field: "gender" },
    { field: "birthDay" },
    { field: "age" },
    { field: "phoneNumber" },
    { field: "contry" },
    { field: "address" },
    {
      field: "button",
      cellRenderer: (params: any) => {
        return (
          <Button
            color="secondary"
            onClick={(event: any) =>
              handleUserUpdate(event, params.node.data.userID)
            }
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </Button>
        );
      },
    },
  ];
  function handleUserUpdate(event: any, userId: string) {
    rowArray.map((row: any) => {
      if (row.userID === userId) {
        const newarray = row;
        const { userID, ...requestBody } = newarray;
        console.log(requestBody);
        updateUser(userId, requestBody);
      }
    });
  }

  const handleChange = (
    event: SelectChangeEvent,
    params: any,
    rowArray: any
  ) => {
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
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
      </>
    );
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowArray}
        columnDefs={columnDefs}
        animateRows={true}
        rowSelection="multiple"
      ></AgGridReact>
    </div>
  );
}
