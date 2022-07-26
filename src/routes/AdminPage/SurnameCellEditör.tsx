import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SurnameCellEditör(params: any) {
  function handleChange(event: any) {
    params.surname = event.target.value;
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "15ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label=""
          defaultValue={params.surname}
          //  value={event?.target.value}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
