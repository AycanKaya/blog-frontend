import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  errorState: State;
  setErrorState: React.Dispatch<React.SetStateAction<State>>;
  errorMessage: string;
}

const ErrorMessages: React.FC<Props> = ({
  errorState,
  setErrorState,
  errorMessage,
}) => {
  const { vertical, horizontal, open } = errorState;

  const handleClose = () => {
    setErrorState({ ...errorState, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={errorMessage}
        key={vertical + horizontal}
      >
        <Alert severity="warning">
          <AlertTitle>
            {" "}
            <strong>Warning</strong>{" "}
          </AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ErrorMessages;
