import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get } from "../../api/axios";
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
import "./style.css";

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

  const defaultColDef = {
    flex: 2,
    editable: false,
    filter: false,
    lockPinned: true,
    suppressMovable: true,
    suppressMenu: true,
    //  headerClass: "text-center",
    //   cellClass: "text-center",
    cellStyle: {
      fontSize: "14px",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const columnDefs = [
    {
      field: "userName",
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
      width: 150,
      cellRenderer: (params: any) => {
        return SurnameCellEditör(params.data);
      },
    },
    {
      field: "role",
      width: 125,
      cellRenderer: (params: any) => {
        return RoleCellEditör(params.data);
      },
    },
    {
      field: "gender",
      width: 140,
      cellRenderer: (params: any) => {
        return GenderSelectEditör(params.data);
      },
    },
    {
      field: "birthDay",
      width: 500,
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
      <div
        className="ag-theme-alpine"
        style={{
          height: 600,
          width: "100%",
        }}
      >
        <AgGridReact
          rowHeight={120}
          rowData={rowArray}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
    </>
  );
}
