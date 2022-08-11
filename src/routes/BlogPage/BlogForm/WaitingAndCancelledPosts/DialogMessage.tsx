import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  object: string;
  Delete: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
}
const DialogMessage: React.FC<Props> = ({
  Delete,
  object,
  setOpenDialog,
  openDialog,
}) => {
  const handleCloseAggre = () => {
    Delete();
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            backgroundColor: "rgb(229, 246, 253)",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "rgb(1, 67, 97)" }}
          >
            Are you sure you want to <strong> delete </strong> {object}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "block",
            backgroundColor: "rgb(229, 246, 253)",
          }}
        >
          <Button onClick={handleClose} sx={{ float: "left" }}>
            Disagree
          </Button>
          <Button onClick={handleCloseAggre} sx={{ float: "right" }} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogMessage;
