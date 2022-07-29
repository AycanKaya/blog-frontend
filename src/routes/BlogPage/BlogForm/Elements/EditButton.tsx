import * as React from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

interface EditProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditör: React.FC<EditProps> = ({ setEdit }) => {
  function handleEditableChange() {
    setEdit(false);
  }
  const sx = {
    position: "absolute",
    marginTop: "430px",
    marginLeft: "270px",
  };

  return (
    <Button
      sx={sx}
      variant="contained"
      size="large"
      onClick={handleEditableChange}
      endIcon={<EditIcon />}
    >
      EDIT
    </Button>
  );
};
export default ButtonEditör;
