import { Card, CardHeader, CardContent, TextField, Fab } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import IComment from '../../api/model/comment';
import { getPosts } from '../../api/service/posts';
import FabComment from '../Fabs/FabComment';
import MenuForComment from '../Menu/MenuForComment';

interface Props {
  comment: IComment;
}
export default function CommentCard({ comment }: PropsWithChildren<Props>) {
  const [edit, setEdit] = useState(true);
  function handleUpdateComment() {
    setEdit(!edit);
  }

  return (
    <Card
      sx={{
        maxWidth: 'fit-content',
        borderRadius: '0px',
        boxShadow: '0'
      }}
      id={comment.id.toString()}>
      <CardHeader
        sx={{
          margin: '0px',
          padding: '0px',
          fontSize: '15px',
          position: 'absolute'
        }}
        title={comment.authorName}
        subheader={comment.created.toString()}
      />
      {localStorage.getItem('id') === comment.authorId && (
        <MenuForComment
          commentId={comment.id}
          authorId={comment.authorId}
          getPosts={getPosts}
          handleUpdateComment={handleUpdateComment}
        />
      )}

      <CardContent sx={{ padding: '15px', minWidth: '400px' }}>
        <TextField
          label="Size"
          id="standard-size-normal"
          defaultValue={comment.content}
          variant="standard"
          disabled={edit}
        />
        {localStorage.getItem('id') === comment.authorId && !edit && (
          <FabComment comment={comment} edit={edit} setEdit={setEdit} />
        )}
      </CardContent>
    </Card>
  );
}
