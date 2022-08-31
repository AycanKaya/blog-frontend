import axiosInstance from '../axios';
import IComment from '../model/comment';

import IPost from '../model/post';

const URL = '/Post/PostComments';

export interface Post {
  post: IPost;
  comment: IComment[];
}

export async function getPosts(): Promise<Post[] | undefined> {
  const { data } = await axiosInstance.get(URL);

  if (data.succeeded !== true) {
    return undefined;
  }

  return data.posts;
}
