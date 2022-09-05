import * as React from 'react';
import Alert from '@mui/material/Alert';
import { PropsWithChildren } from 'react';
import Dialog from '@mui/material/Dialog';
interface Props {
  messageType: string;
  messageContent: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Alerts({
  messageType,
  messageContent,
  open,
  setOpen
}: PropsWithChildren<Props>) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <Alert
        onClose={handleClose}
        severity={messageType === 'success' ? 'success' : 'error'}
        sx={{ width: 'auto' }}>
        {messageContent}
      </Alert>
    </Dialog>
  );
}
