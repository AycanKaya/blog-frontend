import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function NameCellEditör(params: any) {
  function handleChange(event: any) {
    params.name = event.target.value;
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
          label="Name"
          defaultValue={params.name}
          //  value={event?.target.value}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
