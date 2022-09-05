import { Card, CardHeader, CardContent, TextField } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import IComment from '../../api/model/comment';

import FabComment from '../Fabs/FabComment';
import MenuForComment from '../Menu/MenuForComment';
interface Props {
  comment: IComment;
  getComments: () => void;
}
export default function CommentCard({ comment, getComments }: PropsWithChildren<Props>) {
  const [edit, setEdit] = useState(true);
  const [commentContent, setCommentContent] = useState(comment.content);

  function handleChange(event: any) {
    setCommentContent(event.target.value);
  }

  function handleUpdateComment() {
    setEdit(!edit);
  }

  return (
    <>
      <hr
        style={{
          border: 0,
          height: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
        }}></hr>
      <Card
        sx={{
          maxWidth: 'fit-content',
          borderRadius: '0px',
          boxShadow: '0'
        }}
        id={comment.id.toString()}>
        <CardHeader
          sx={{
            bottom: 0,
            fontSize: '20px',
            width: 'auto',
            float: 'left',
            display: 'contents'
          }}
          titleTypographyProps={{ fontSize: '0.987rem', paddingTop: '8px', paddingLeft: '10px' }}
          title={comment.authorName}
        />
        {localStorage.getItem('id') === comment.authorId && (
          <MenuForComment
            commentId={comment.id}
            authorId={comment.authorId}
            getComments={getComments}
            handleUpdateComment={handleUpdateComment}
          />
        )}

        <CardContent sx={{ padding: '15px', minWidth: '400px' }}>
          <TextField
            id="standard-size-normal"
            multiline
            defaultValue={commentContent}
            onChange={handleChange}
            variant="standard"
            InputProps={{
              disableUnderline: edit
            }}
            disabled={edit}
            sx={{ paddingTop: '0px', minWidth: '350px' }}
          />
          {localStorage.getItem('id') === comment.authorId && !edit && (
            <FabComment
              commentId={comment.id}
              commentContent={commentContent}
              edit={edit}
              setEdit={setEdit}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
