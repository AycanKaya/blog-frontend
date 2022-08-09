import { post } from "../../../api/axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, createTheme, Fab, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AgGridReact from "./SettingPosts";
import SettingPosts from "./SettingPosts";

const SetApprove = (params: any) => {
  async function ActivateRequest(body: any) {
    await post("/EditorUser/ActivateControl", body).then((response) => {
      updatePage();
      return response;
    });
  }

  function updatePage() {
    const root = ReactDOM.render(
      <AgGridReact />,
      document.getElementById("root")
    );
  }

  function handleConfirmClick() {
    ActivateRequest({ postID: params.postId, isApprove: true });
  }
  function handleCancelClick() {
    ActivateRequest({ postID: params.postId, isApprove: false });
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#BDF8A3",
      },
      secondary: {
        main: "#8F1402",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ "& > :not(style)": { m: 0.3 } }}>
        <Fab color="primary" aria-label="add" onClick={handleConfirmClick}>
          <CheckIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={handleCancelClick}>
          <ClearIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};
export default SetApprove;
