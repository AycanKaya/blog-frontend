import { post } from '../../api/axios';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Fab } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props {
  params: any;
  getAllUserInfo: () => void;
}

export function SetApprove({ params, getAllUserInfo }: PropsWithChildren<Props>) {
  async function ActivateRequest(body: any) {
    await post('/EditorUser/ActivateControl', body).then((response) => {
      console.log(response);
      getAllUserInfo();
    });
  }

  function handleConfirmClick() {
    ActivateRequest({ postID: params.data.postId, isApprove: true });
  }
  function handleCancelClick() {
    ActivateRequest({ postID: params.data.postId, isApprove: false });
  }

  return (
    <Box sx={{ '& > :not(style)': { m: 0.3 } }}>
      <Fab color="primary" aria-label="add" onClick={handleConfirmClick}>
        <CheckIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit" onClick={handleCancelClick}>
        <ClearIcon />
      </Fab>
    </Box>
  );
}
