import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { get } from "../../api/axios";

interface IRow {
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
  const [rowArray, setRowArray] = useState<IRow[]>();

  // 2000-04-19T06:44:03.66

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
    { field: "role" },
    { field: "gender" },
    { field: "birthDay" },
    { field: "age" },
    { field: "phoneNumber" },
    { field: "contry" },
    { field: "address" },
  ]);

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
