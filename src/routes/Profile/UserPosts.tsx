import * as React from 'react';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { CardContent } from '@mui/material';

import { get } from '../../api/axios';
import { Comments } from './Comments';
import PostTags from '../UserHome/PostTags';
import IPost from '../../api/model/post';
import IComment from '../../api/model/comment';
import Posts from '../UserHome/Posts';

interface IPostComments {
  post: IPost;
  comments: IComment[];
}

export function UserPosts() {
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getUserPosts() {
    get('/Post/GetUserPosts').then((response: any) => {
      setPostComments(response.posts);
    });
  }
  useEffect(() => {
    getUserPosts();
  }, [postComments]);

  const sx = {
    maxWidth: 'fit-content',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '50px',
    padding: '0',
    display: 'block'
  };
  const postList = postComments.map((postComment: IPostComments) => (
    <>
      <Card sx={sx}>
        <CardContent>
          <Posts Post={postComment.post} getUserPosts={getUserPosts} />
          <PostTags postId={postComment.post.postId} />
          <Comments
            comments={postComment.comments}
            postId={postComment.post.postId}
            getRecentFivePosts={getUserPosts}
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
}
