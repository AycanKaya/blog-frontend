import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import { post } from "../../../../api/axios";
import SendIcon from "@mui/icons-material/Send";

interface IUser {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
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
interface IRequestPassword {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
const requestBody: IRequestPassword = {
  email: "",
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const AccountSettings: React.FC<UserProps> = ({ userInfo }) => {
  const [edit, setEdit] = useState(true);
  const [body, setBody] = useState(requestBody);
  const [name, setName] = useState(userInfo.userName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function handleEditableChange() {
    setEdit(false);
  }

  function updatePassword() {}

  const sx = {
    padding: "10px",
    paddingInlineStart: "10px",
    borderRadius: "10px",
    width: 200,
    boxShadow: "#3B719F 0px 5px 15px",
    display: "inline-table",
  };
  return (
    <>
      <div className="textDiv">
        <p className="social">Email : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.email}
          InputProps={{ disableUnderline: true }}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>
      <div className="textDiv">
        <p className="social">Old Password : </p>
        <TextField
          sx={sx}
          variant="standard"
          size="medium"
          value={userInfo.userName}
          InputProps={{ disableUnderline: true }}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>
      <div className="textDiv">
        <p className="social">Password : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={userInfo.name}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>

      <div className="textDiv">
        <p className="social">Confirm Password : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.surname}
          InputProps={{ disableUnderline: true }}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>
      <Button
        sx={{
          position: "absolute",
        }}
        size="large"
        variant="contained"
        endIcon={<SendIcon />}
        disabled={edit}
        onClick={updatePassword}
      >
        SAVE
      </Button>
      <Button
        sx={{
          position: "absolute",
        }}
        variant="contained"
        size="large"
        onClick={handleEditableChange}
        endIcon={<EditIcon />}
      >
        EDIT
      </Button>
    </>
  );
};
export default AccountSettings;
