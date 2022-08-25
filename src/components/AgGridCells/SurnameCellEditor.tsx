import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SurnameCellEditor(params: any) {
  function handleChange(event: any) {
    params.surname = event.target.value;
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '15ch' }
      }}
      noValidate
      autoComplete="on">
      <div>
        <TextField
          required
          id="outlined-required"
          defaultValue={params.surname}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
