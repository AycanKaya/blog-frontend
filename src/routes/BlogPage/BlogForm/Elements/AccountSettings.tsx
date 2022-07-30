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

  useEffect(() => {
    setBody({ ...body, email: userInfo.email });
  }, []);

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBody({ ...body, oldPassword: event.target.value });
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody({ ...body, password: event.target.value });
  };
  const handleConfirmPasswodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBody({ ...body, confirmPassword: event.target.value });
  };

  function handleEditableChange() {
    setEdit(false);
  }

  function updatePassword() {
    post("/Account/reset-password", body).then((response: any) => {
      console.log(response);
    });
  }

  const sx = {
    padding: "5px",
    paddingInlineStart: "10px",
    borderRadius: "10px",
    width: 200,
    boxShadow: "#3B719F 0px 5px 15px",
    display: "inline-table",
  };
  return (
    <>
      <div className="divForPassword">
        <p className="social">Old Password : </p>
        <TextField
          sx={sx}
          variant="standard"
          size="medium"
          value={body.oldPassword}
          InputProps={{ disableUnderline: true }}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOldPasswordChange(event)
          }
        />
      </div>
      <div className="divForPassword">
        <p className="social">Password : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={body.password}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handlePasswordChange(event)
          }
        />
      </div>

      <div className="divForPassword">
        <p className="social">Confirm Password : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={body.confirmPassword}
          InputProps={{ disableUnderline: true }}
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleConfirmPasswodChange(event)
          }
        />
      </div>
      <Button
        sx={{
          position: "initial",
          display: "inline-table",
          margin: "40px",
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
          position: "initial",
          display: "inline-table",
          margin: "40px",
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
