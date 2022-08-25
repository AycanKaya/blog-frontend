import { useEffect, useState } from 'react';
import { get } from '../../api/axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import TextCellEditor from '../../components/AgGridCells/TextCellEditor';
import RoleCellEditor from '../../components/AgGridCells/RoleCellEditor';
import NameCellEditor from '../../components/AgGridCells/NameCellEditor';
import SurnameCellEditor from '../../components/AgGridCells/SurnameCellEditor';
import GenderSelectEditor from '../../components/AgGridCells/GenderSelectEditor';
import DateCellEditor from '../../components/AgGridCells/DateCellEditor';
import AgeCellEditor from '../../components/AgGridCells/AgeCellEditor';
import PhoneNumberCellEditor from '../../components/AgGridCells/PhoneNumberCellEditor';
import CountryCellEditor from '../../components/AgGridCells/CountryCellEditor';
import AddressCellEditor from '../../components/AgGridCells/AddressCellEditor';
import ButtonEditor from '../../components/AgGridCells/ButtonEditor';
import './style.css';

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

export default function Dashboard() {
  const [rowArray, setRowArray] = useState<IRow[]>([]);

  function getAllUserInfo() {
    get('/Account/GetAllUserInfo').then((response: any) => {
      setRowArray(response.userInfos);
    });
  }
  useEffect(() => {
    getAllUserInfo();
  }, []);

  const defaultColDef = {
    editable: false,
    filter: false,
    lockPinned: true,
    suppressMovable: true,
    suppressMenu: true,
    headerClass: 'text-center',
    cellClass: 'text-center',
    cellStyle: {
      fontSize: '12px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  const columnDefs = [
    {
      field: 'userName',
      width: 110,
      cellRenderer: (params: any) => {
        return TextCellEditor(params.data);
      }
    },
    {
      field: 'name',
      width: 100,
      cellRenderer: (params: any) => {
        return NameCellEditor(params.data);
      }
    },
    {
      field: 'surname',
      width: 107,
      cellRenderer: (params: any) => {
        return SurnameCellEditor(params.data);
      }
    },
    {
      field: 'role',
      width: 100,
      cellRenderer: (params: any) => {
        return RoleCellEditor(params.data);
      }
    },
    {
      field: 'gender',
      width: 100,
      cellRenderer: (params: any) => {
        return GenderSelectEditor(params.data);
      }
    },
    {
      field: 'birthDay',
      width: 140,
      cellRenderer: (params: any) => {
        return DateCellEditor(params.data);
      }
    },
    {
      field: 'age',
      width: 90,
      cellRenderer: (params: any) => {
        return AgeCellEditor(params.data);
      }
    },
    {
      field: 'phoneNumber',
      width: 120,
      cellRenderer: (params: any) => {
        return PhoneNumberCellEditor(params.data);
      }
    },
    {
      field: 'contry',
      width: 150,
      cellRenderer: (params: any) => {
        return CountryCellEditor(params.data);
      }
    },
    {
      field: 'address',
      width: 170,
      cellRenderer: (params: any) => {
        return AddressCellEditor(params.data);
      }
    },
    {
      width: 130,
      cellRenderer: (params: any) => {
        return ButtonEditor(params);
      }
    }
  ];

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{
          height: 600,
          width: '100%'
        }}>
        <AgGridReact
          rowHeight={80}
          rowData={rowArray}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"></AgGridReact>
      </div>
    </>
  );
}
