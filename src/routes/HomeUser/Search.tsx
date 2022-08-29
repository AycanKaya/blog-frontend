import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { get, getWithout } from '../../api/axios';
import ITag from '../../api/model/tag';
import IPost from '../../api/model/post';
import { useEffect, useState } from 'react';
import { Posts } from './Posts';
import PostCard from '../../components/PostCard';
import { PostTags } from './PostTags';

export function Search() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  const postList = posts.map((post: IPost) => (
    <PostCard post={post} depth={200}>
      <PostTags postId={post.postId} />
    </PostCard>
  ));

  useEffect(() => {
    getWithout('/Tag/AllTags').then((response) => {
      if (response.succeeded) {
        setTags(response.tags);
      }
      getPosts();
    });
  }, []);

  function getPosts() {
    get('/Post/AllPosts').then((response) => {
      setPosts(response.posts);
    });
  }

  function searchAccordingToTags(event: any, value: ITag[]) {
    if (value == null || value.length == 0) {
      return getPosts();
    }
    var search = '';
    value.map((tag: ITag) => {
      search += tag.tagName + '-';
    });
    getWithout('/Tag/GetPostsInTags?tags=' + search).then((response) => {
      setPosts(response.posts);
    });
  }

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          width: '976px',
          marginLeft: '150px',
          marginRight: '150px',
          marginTop: '50px'
        }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={tags}
          getOptionLabel={(option) => option.tagName}
          onChange={(event, value) => searchAccordingToTags(event, value)}
          renderInput={(params) => (
            <TextField
              sx={{ width: '30%', float: 'right' }}
              {...params}
              variant="standard"
              placeholder="Tags"
            />
          )}
        />
      </Stack>
      <Posts postList={postList} />
    </>
  );
}
