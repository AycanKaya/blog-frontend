import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get } from "../../api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";

interface IRow {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  gender: string;
  birthDay: string;
  age: string;
  phoneNumber: string;
  contry: string;
  address: string;
}

export default function GenerateRows() {
  const [rowArray, setRowArray] = useState<IRow[]>([]);

  function convertDate(strDate: string) {
    var year = strDate.substr(0, 4);
    var mounth = strDate.substr(5, 2);
    var day = strDate.substr(8, 2);
    return year + "/" + mounth + "/" + day;
  }

  function getOneUserInfo() {
    get("/Account/GetUserInfo").then((response: IRow) => {
      setRowArray([response]);
    });
  }
  function getAllUserInfo() {
    get("/Account/GetAllUserInfo").then((response: IRow[]) => {
      setRowArray(response);
    });
  }

  rowArray?.forEach(function (value) {
    value.birthDay = convertDate(value.birthDay);
  });

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const [columnDefs] = useState([
    { field: "userName" },
    { field: "name" },
    { field: "surname" },
    {
      field: "role",
      cellRenderer: (params: any) => userRoleCellRenderer(params, rowArray),
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
            onClick={(event: any) => handleUserUpdate(event, params.node.data)}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </Button>
        );
      },
    },
  ]);

  const [role, setRole] = React.useState("");
  console.log(rowArray);
  const handleChange = (
    event: SelectChangeEvent,
    id: string,
    dataArray: IRow[]
  ) => {
    // rowData'yı geçici array'e koy (array.from)
    //array'ı map ile kontrol et
    // setRole(event.target.value as string);

    console.log(dataArray);

    const tempArray = Array.from(dataArray);
    tempArray.map((row) => {
      if (row.userID == id) {
        row.role = event.target.value;
      }
    });
    console.log(tempArray);

    setRowArray(tempArray);
  };

  function userRoleCellRenderer(params: any, dataArray: IRow[]) {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={params.data.userID}
            value={params.data.role}
            label="role"
            onChange={(event) =>
              handleChange(event, params.data.userID, dataArray)
            }
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Basic"}>Basic</MenuItem>
            <MenuItem value={""}>''</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }

  function handleUserUpdate(event: any, data: any) {}

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
