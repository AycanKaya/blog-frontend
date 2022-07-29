import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import { post } from "../../../../api/axios";

interface IUser {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  gender: number;
  birthDay: Date;
  age: string;
  phoneNumber: string;
  contry: string;
  address: string;
}
interface UserProps {
  userInfo: IUser;
}

const AccountSettings: React.FC<UserProps> = ({ userInfo }) => {
  const [editable, setEditable] = useState(true);

  const [name, setName] = useState(userInfo.userName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function handleEditableChange() {
    setEditable(false);
  }

  return (
    <>
      <div>
        {" "}
        UserName :
        <TextField
          id="standard-required"
          variant="standard"
          value={name}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
        <IconButton aria-label="edit" onClick={handleEditableChange}>
          <EditIcon />
        </IconButton>
      </div>
      <Button variant="outlined" disabled={editable}>
        SAVE
      </Button>
    </>
  );
};
export default AccountSettings;
