import * as React from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

interface EditProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditör: React.FC<EditProps> = ({ setEdit }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3B719F",
      },
    },
  });

  function handleEditableChange() {
    setEdit(false);
  }
  const sx = {
    padding: "4px 20px",
    position: "initial",
    display: "inline-table",
    margin: "40px",
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={sx}
        variant="contained"
        size="large"
        onClick={handleEditableChange}
        endIcon={<EditIcon />}
      >
        EDIT
      </Button>
    </ThemeProvider>
  );
};
export default ButtonEditör;
