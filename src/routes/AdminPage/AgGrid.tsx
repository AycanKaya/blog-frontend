import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get, post, put } from "../../api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import FormPropsTextFields from "./TextCellEditör";

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

  function handleUserUpdate(event: any, userId: string) {
    rowArray.map((row: any) => {
      if (row.userID === userId) {
        const newarray = row;
        const { userID, ...requestBody } = newarray;
        updateUser(userId, requestBody);
      }
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
    {
      field: "userName",
      editable: true,
      width: 150,
      cellRenderer: (params: any) => {
        return FormPropsTextFields(params.data);
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
        <div className="center">
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
