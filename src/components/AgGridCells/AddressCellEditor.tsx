import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddressCellEditor(params: any) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    params.address = event.target.value;
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' }
      }}
      noValidate
      autoComplete="off">
      <div>
        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          multiline
          rows={3}
          defaultValue={params.address}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
