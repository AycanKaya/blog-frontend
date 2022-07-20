import axiosInstance from "../axios";
import { post, getAll } from "../axios";
import Post from "../model/post";

interface PostDTO {
  title: string;
  content: string;
}

export default async function createPost(
  dto: PostDTO,
  token: string
): Promise<Post> {
  const { data } = await axiosInstance.post<Post>(
    `/User/PostUser?token=${token}`
  );

  return data;
}

export async function getPost(): Promise<Post> {
  const { data } = await getAll("/User/GetAllPosts");
  return data;
}
