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
        marginTop: '10px',
        boxShadow: '0',
        background: '#3c52b2bf',
        color: '#ffff',
        '&:hover': {
          backgroundColor: '#3c52b2',
          color: '#ffff'
        },
        marginLeft: '340px'
      }}
      disabled={edit}
      onClick={UpdateComment}>
      Reply
    </Fab>
  );
}
