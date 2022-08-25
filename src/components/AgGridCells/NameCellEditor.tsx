import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NameCellEditor(params: any) {
  function handleChange(event: any) {
    params.name = event.target.value;
  }

  return (
    <TextField
      variant="standard"
      InputProps={{ disableUnderline: true }}
      defaultValue={params.name}
      //  value={event?.target.value}
      onChange={(event) => handleChange(event)}
    />
  );
}
