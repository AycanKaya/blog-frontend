import { Button } from '@mui/material';
import { PropsWithChildren, useEffect, useState } from 'react';
import IComment from '../../api/model/comment';
import CommentCard from './CommentCard';

interface Props {
  comments: IComment[];
}
export default function CommentBox({ comments }: PropsWithChildren<Props>) {
  const [showedComment, setShowedComment] = useState<IComment[]>([]);

  useEffect(() => {
    setShowedComment(comments.slice(0, 5));
  }, []);

  function showCommentSet() {
    const last = showedComment.length;
    setShowedComment(showedComment.concat(comments.slice(last, last + 4)));
    console.log(setShowedComment);
  }
  const commentList = comments.map((comment: IComment) => {
    <CommentCard comment={comment} />;
  });

  // Bir buton daha ekle , gördüklerini azaltmak için
  return (
    <>
      {commentList}
      {commentList.length > 5 && <Button onClick={showCommentSet}> See more </Button>}
    </>
  );
}
