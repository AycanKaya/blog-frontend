import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { post } from "../../../../api/axios";
import SendIcon from "@mui/icons-material/Send";

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
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditör: React.FC<UserProps> = ({ userInfo, edit, setEdit }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3B719F",
      },
    },
  });

  async function updateUser() {
    await post("/Account/UserInfo", userInfo).then((response: IUser) => {
      console.log("Success", response);
    });
  }

  async function updateUserInformation() {
    await updateUser();
    setEdit(true);
  }
  const sx = {
    padding: "4px 20px",
    position: "initial",
    display: "inline-table",
    margin: "50px",
    marginLeft: "50px",
  };
  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={sx}
        size="large"
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        disabled={edit}
        onClick={updateUserInformation}
      >
        SAVE
      </Button>
    </ThemeProvider>
  );
};
export default ButtonEditör;
