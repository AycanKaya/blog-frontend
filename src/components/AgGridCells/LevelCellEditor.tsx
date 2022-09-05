import { FormControl, MenuItem } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

export default function LevelCellEditor(params: any) {
  const [level, setLevel] = useState(params.level);

  const handleChange = (event: SelectChangeEvent, params: any) => {
    params.level = event.target.value;
    setLevel(event.target.value as string);
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
            value={level}
            onChange={(event) => handleChange(event, params)}>
            <MenuItem value={'Level 1'}>Level 1</MenuItem>
            <MenuItem value={'Level 2'}>Level 2</MenuItem>
            <MenuItem value={'Level 3'}>Level 3</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}
