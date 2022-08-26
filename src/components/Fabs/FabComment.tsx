import { Fab } from '@mui/material';
import { PropsWithChildren } from 'react';
import { put } from '../../api/axios';
import IComment from '../../api/model/comment';

interface Props {
  comment: IComment;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FabComment({ comment, edit, setEdit }: PropsWithChildren<Props>) {
  function UpdateComment() {
    put('/Comment/UpdateComment', {
      commentID: comment.id,
      content: comment.content
    }).then((response) => {
      console.log('COMMENT İSTEĞİNİ TEKRAR AT');
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
