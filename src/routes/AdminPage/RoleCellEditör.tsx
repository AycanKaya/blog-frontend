import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";

export default function RoleCellEditör(params: any) {
  const [role, setRole] = React.useState(params.role);

  const handleChange = (event: SelectChangeEvent, params: any) => {
    params.role = event.target.value;
    setRole(event.target.value as string);
  };

  return (
    <>
      <div>
        <FormControl fullWidth>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            variant="standard"
            inputProps={{ disableUnderline: true }}
            id={params.userID}
            value={role}
            onChange={(event) => handleChange(event, params)}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Basic"}>Basic</MenuItem>
            <MenuItem value={"Editor"}>Editor</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}
