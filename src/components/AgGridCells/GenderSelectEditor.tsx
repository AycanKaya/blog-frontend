import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function GenderSelectEditor(params: any) {
  const [gender, setGender] = React.useState(params.gender);

  const handleChange = (event: SelectChangeEvent) => {
    params.gender = event.target.value;
    setGender(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="standard"
          inputProps={{ disableUnderline: true }}
          value={gender}
          onChange={handleChange}>
          <MenuItem value={0}>Kadın</MenuItem>
          <MenuItem value={1}>Erkek</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
