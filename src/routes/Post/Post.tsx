import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../api/axios';
import IComment from '../../api/model/comment';
import IPost from '../../api/model/post';
import CommentBox from '../../components/CommentBox/CommentBox';
import PostCard from '../../components/PostCard';

const sx = {
  maxWidth: 'fit-content',
  marginLeft: '200px',
  marginRight: '200px',
  marginTop: '50px',
  padding: '10px'
};
export default function Post() {
  let params = useParams();
  const [post, setPost] = useState<IPost>({
    postId: 0,
    authorName: '',
    authorEmail: '',
    title: '',
    content: '',
    isApprove: false,
    isDeleted: false,
    createTime: new Date(),
    updateTime: new Date()
  });
  const [comment, setComment] = useState<IComment[]>([]);

  function getPost() {
    get('/Post/id?id=' + params.postId).then((response) => {
      setPost(response.post);
    });
  }

  function getComments() {
    get('/Comment/GetComments?postId=' + params.postId).then((response) => {
      setComment(response.comments);
    });
  }

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  return (
    <PostCard post={post} sx={sx} depth={Number.MAX_SAFE_INTEGER + 1} isDetail={false}>
      <CommentBox comments={comment} getComments={getComments} postID={post.postId} />
    </PostCard>
  );
}
