import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function DateCellEditör(params: any) {
  function setDefaultValue(date: string) {
    var year = date.substr(0, 4);
    var mounth = date.substr(5, 2);
    var day = date.substr(8, 2);
    return year + "-" + mounth + "-" + day;
  }

  function handleChange(event: any) {
    params.birthDay = event.target.value;
  }
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        type="date"
        defaultValue={setDefaultValue(params.birthDay)}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => handleChange(event)}
      />
    </Stack>
  );
}
