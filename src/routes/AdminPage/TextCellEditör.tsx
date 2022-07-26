import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields(params: any) {
  function handleChange(event: any) {
    params.userName = event.target.value;
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
          label="UserName"
          defaultValue={params.userName}
          //  value={event?.target.value}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </Box>
  );
}
