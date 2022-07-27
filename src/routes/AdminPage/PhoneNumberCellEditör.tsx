import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PhoneNumberCellEditör(params: any) {
  function handleChange(event: any) {
    params.phoneNumber = event.target.value;
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
          defaultValue={params.phoneNumber}
          //  value={event?.target.value}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
