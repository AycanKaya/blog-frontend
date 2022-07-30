import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { put } from "../../api/axios";

export default function ButtonEditör(params: any) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3B719F",
      },
    },
  });

  function updateUser(userId: string, body: string) {
    const url = "/Admin/Dashboard?id=" + userId;
    put(url, body).then((respone: any) => {
      console.log(respone);
    });
  }

  function handleUpdate(params: any) {
    console.log(params);
    const newarray = params;
    const userId = params.userID;
    const { userID, ...requestBody } = newarray;
    updateUser(userId, requestBody);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          className="Button"
          size="medium"
          color="primary"
          onClick={(event: any) => handleUpdate(params.data)}
          endIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </Button>
      </ThemeProvider>
    </>
  );
}
