import { post } from "../../../api/axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, createTheme, Fab, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

const SetApprove = (params: any) => {
  async function ActivateRequest(body: any) {
    console.log("BODY => ", body);
    await post("/EditorUser/ActivateControl", body).then((response) => {
      return response;
    });
  }

  function handleConfirmClick() {
    ActivateRequest({ postID: params.post.id, isApprove: true });
  }
  function handleCancelClick() {
    ActivateRequest({ postID: params.post.id, isApprove: false });
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
