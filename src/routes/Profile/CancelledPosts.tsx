import * as React from 'react';
import { useEffect } from 'react';

import { get } from '../../api/axios';
import IPost from '../../api/model/post';
import PostCard from '../../components/PostCard/PostCard';

export function CancelledPosts() {
  const [posts, setPosts] = React.useState<IPost[]>([]);

  function getPosts() {
    get('/Post/CancelledPosts').then((response: any) => {
      setPosts(response.posts.slice(0, 5));
    });
  }
  useEffect(() => {
    getPosts();
  }, []);

  const postList = posts.map((post: IPost) => (
    <>
      <PostCard post={post} />
    </>
  ));

  return (
    <>
      <div>{postList}</div>
    </>
  );
}
