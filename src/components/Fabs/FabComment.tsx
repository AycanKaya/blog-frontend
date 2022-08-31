import { Fab } from '@mui/material';
import { request } from 'http';
import { PropsWithChildren } from 'react';
import { put } from '../../api/axios';
import IComment from '../../api/model/comment';

interface Props {
  commentId: number;
  commentContent: string;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FabComment({
  commentId,
  commentContent,
  edit,
  setEdit
}: PropsWithChildren<Props>) {
  const requestBody = {
    commentID: commentId,
    content: commentContent
  };
  function UpdateComment() {
    put('/Comment/UpdateComment', requestBody).then((response) => {
      console.log(response);
      console.log(requestBody);
      setEdit(!edit);
    });
  }

  return (
    <Fab
      variant="extended"
      className="css-1sltwf-MuiButtonBase-root-MuiFab-root.Mui-disabled"
      sx={{
        float: 'right',
        width: '60px',
        height: '40px',
        marginBottom: '10px',
        boxShadow: '0'
      }}
      disabled={edit}
      onClick={UpdateComment}>
      Reply
    </Fab>
  );
}
