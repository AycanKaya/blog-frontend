import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AgeCellEditör(params: any) {
  function handleChange(event: any) {
    params.age = event.target.value;
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "7ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label=""
          defaultValue={params.age}
          //  value={event?.target.value}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
