import * as React from 'react';
import Card from '@mui/material/Card';
import { getWithout } from '../../../api/axios';
import { useEffect } from 'react';
import { Avatar, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import './style.css';
import IPostComments from '../../../api/model/postComment';
import { Comments } from '../../Profile/Comments';

const Posts: React.FC = () => {
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getRecentFivePosts() {
    getWithout('/Post/PostComments').then((response: any) => {
      setPostComments(response.posts.slice(0, 5));
    });
  }
  useEffect(() => {
    getRecentFivePosts();
  }, []);

  const sx = {
    maxWidth: 'fit-content',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '50px',
    padding: '10px'
  };
  const postList = postComments.map((postComment: IPostComments) => (
    <>
      <Card sx={sx}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p className="header1">{postComment.post.title}</p>
            {postComment.post.content}
          </Typography>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: red[500],
                  width: '20px',
                  height: '20px'
                }}
                aria-label="recipe"></Avatar>
            }
            sx={{
              bottom: 0,

              fontSize: '10px',
              width: 'auto',
              float: 'right'
            }}
            titleTypographyProps={{ fontSize: '0.657rem' }}
            title={'Written by ' + postComment.post.authorName}
            subheader={postComment.post.authorEmail}
          />

          <Comments
            comments={postComment.comments}
            postId={postComment.post.postId}
            getRecentFivePosts={getRecentFivePosts}
          />
        </CardContent>
      </Card>
    </>
  ));

  return (
    <>
      <div>{postList}</div>
    </>
  );
};
export default Posts;
