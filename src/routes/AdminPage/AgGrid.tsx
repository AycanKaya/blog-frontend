import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get, post, put } from "../../api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import TextCellEditör from "./TextCellEditör";
import RoleCellEditör from "./RoleCellEditör";
import NameCellEditör from "./NameCellEditör";
import SurnameCellEditör from "./SurnameCellEditör";
import GenderSelectEditör from "./GenderSelectEditör";
import DateCellEditör from "./DateCellEditör";
import AgeCellEditör from "./AgeCellEditör";
import PhoneNumberCellEditör from "./PhoneNumberCellEditör";
import CountryCellEditör from "./CountryCellEditör";
import AddressCellEditör from "./AddressCellEditör";
import ButtonEditör from "./ButtonEditör";

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
    {
      field: "name",
      width: 150,
      cellRenderer: (params: any) => {
        return NameCellEditör(params.data);
      },
    },
    {
      field: "surname",
      editable: true,
      width: 150,
      cellRenderer: (params: any) => {
        return SurnameCellEditör(params.data);
      },
    },
    {
      field: "role",
      width: 125,
      editable: true,
      cellRenderer: (params: any) => {
        return RoleCellEditör(params.data);
      },
    },
    {
      field: "gender",
      width: 130,
      cellRenderer: (params: any) => {
        return GenderSelectEditör(params.data);
      },
    },
    {
      field: "birthDay",
      width: 240,
      cellRenderer: (params: any) => {
        return DateCellEditör(params.data);
      },
    },
    {
      field: "age",
      width: 90,
      cellRenderer: (params: any) => {
        return AgeCellEditör(params.data);
      },
    },
    {
      field: "phoneNumber",
      width: 150,
      cellRenderer: (params: any) => {
        return PhoneNumberCellEditör(params.data);
      },
    },
    {
      field: "contry",
      width: 210,
      cellRenderer: (params: any) => {
        return CountryCellEditör(params.data);
      },
    },
    {
      field: "address",
      width: 200,
      cellRenderer: (params: any) => {
        return AddressCellEditör(params.data);
      },
    },
    {
      field: "button",
      cellRenderer: (params: any) => {
        return ButtonEditör(params);
      },
    },
  ];

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
