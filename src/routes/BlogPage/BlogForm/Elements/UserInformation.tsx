import { TextField } from "@mui/material";
import * as React from "react";
import "../Styles/style.css";
const UserInformation = () => {
  return (
    <div className="center">
      <TextField
        label="Primary"
        placeholder="Type in here…"
        variant="outlined"
        color="primary"
      />
    </div>
  );
};
export default UserInformation;
