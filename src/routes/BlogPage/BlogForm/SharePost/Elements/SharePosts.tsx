import { Card, Typography } from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";

export default function PostSharing() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const sx = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "974px",
    maxWidth: "100%",
    marginLeft: "150px",
    marginRight: "150px",
    marginTop: "50px",
    padding: "10px",
  };

  return (
    <>
      <Card sx={sx}>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={1}
          defaultValue="Enter a title"
        />
        <TextField
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </Card>
    </>
  );
}
