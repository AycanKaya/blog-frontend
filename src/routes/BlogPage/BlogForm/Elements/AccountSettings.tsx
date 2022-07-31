import {
  Box,
  Button,
  createTheme,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import { post } from "../../../../api/axios";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3B719F",
      },
    },
  });

  const [edit, setEdit] = useState(true);
  const [body, setBody] = useState(requestBody);
  const [showPassword, setShowPassword] = useState(false);

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
    setEdit(true);
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const sx = {
    paddingRight: "5px",
    borderRadius: "10px",
    boxShadow: "#8F8CE7 0px 3px 8px",
    marginBottom: "10px",
  };
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ position: "center" }}
            >
              Old Password
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.oldPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOldPasswordChange(event)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    sx={{ paddingLeft: "6px" }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ position: "center" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handlePasswordChange(event)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    sx={{ paddingLeft: "6px" }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ position: "center" }}
            >
              Confirm Password :
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleConfirmPasswodChange(event)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    sx={{ paddingLeft: "6px" }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <ThemeProvider theme={theme}>
        <Button
          sx={{
            padding: "4px 20px",
            position: "initial",
            display: "inline-table",
            margin: "40px",
          }}
          size="large"
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={edit}
          onClick={updatePassword}
        >
          SAVE
        </Button>
        <Button
          sx={{
            padding: "5px 20px",
            position: "initial",
            display: "inline-table",
            margin: "40px",
          }}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleEditableChange}
          endIcon={<EditIcon />}
        >
          EDIT
        </Button>
      </ThemeProvider>
    </>
  );
};
export default AccountSettings;
