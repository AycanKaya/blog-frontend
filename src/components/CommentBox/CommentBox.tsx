import { Button, TextField } from '@mui/material';
import { PropsWithChildren, useEffect, useState } from 'react';
import { post } from '../../api/axios';
import IComment from '../../api/model/comment';
import CommentCard from './CommentCard';

interface Props {
  postID: number;
  comments: IComment[];
  getComments: () => void;
}
export default function CommentBox({ comments, getComments, postID }: PropsWithChildren<Props>) {
  const [showedComment, setShowedComment] = useState<JSX.Element[]>([]);
  const [reply, setReply] = useState('');

  const commentList = comments.map((comment: IComment) => (
    <CommentCard comment={comment} getComments={getComments} />
  ));

  function updateCommentList(commentList: JSX.Element[]) {
    commentList = comments.map((comment: IComment) => (
      <CommentCard comment={comment} getComments={getComments} />
    ));
  }

  const handleChange = (event: any) => {
    setReply(event.target.value);
  };

  function showCommentSet() {
    const last = showedComment.length;
    setShowedComment(showedComment.concat(commentList.slice(last, last + 4)));
  }
  function showLessComment() {
    const last = showedComment.length;
    setShowedComment(showedComment.splice(0, last - 4));
  }
  const onClick = () => {
    post('/Comment/ShareComment', { content: reply, postID: postID })
      .then((response) => {
        setReply('');
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    updateCommentList(commentList);
    setShowedComment(commentList.slice(0, 4));
  }, [comments]);

  return (
    <div style={{ marginTop: '75px', width: '50%' }}>
      {showedComment}
      {commentList.length > 4 && showedComment.length < commentList.length && (
        <Button onClick={showCommentSet}> See more </Button>
      )}

      {commentList.length > 4 && showedComment.length > 4 && (
        <Button onClick={showLessComment}> See less </Button>
      )}

      <TextField
        fullWidth
        multiline
        placeholder="your reply"
        id="fullWidth"
        value={reply}
        onChange={handleChange}
      />

      <Button
        sx={{
          float: 'right',
          margin: '5px',
          background: '#3c52b2bf',
          color: '#ffff',
          borderWidth: '1px',
          borderRadius: '9999px',
          fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          '&:hover': {
            backgroundColor: '#3c52b2',
            color: '#ffff'
          }
        }}
        onClick={onClick}>
        Reply
      </Button>
    </div>
  );
}
