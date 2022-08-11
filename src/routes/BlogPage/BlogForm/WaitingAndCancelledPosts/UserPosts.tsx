import * as React from "react";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useEffect } from "react";
import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import { get } from "../../../../api/axios";
import Comments from "./Comments";
import Posts from "../HomePage/Posts";

interface IPost {
  postId: number;
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  isApprove: boolean;
  isDeleted: boolean;
  isActive: boolean;
  authorID: string;
  createTime: Date;
  updateTime: Date;
}
interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  created: Date;
}
interface IPostComments {
  post: IPost;
  comments: IComment[];
}
const UserPosts: React.FC = () => {
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getUserPosts() {
    get("/Post/GetUserPosts").then((response: any) => {
      setPostComments(response.posts);
    });
  }
  useEffect(() => {
    getUserPosts();
  }, []);

  const sx = {
    maxWidth: "fit-content",
    marginLeft: "150px",
    marginRight: "150px",
    marginTop: "50px",
    padding: "0",
    display: "block",
  };
  const postList = postComments.map((postComment: IPostComments) => (
    <>
      <Card sx={sx}>
        <CardContent>
          <Posts Post={postComment.post} getUserPosts={getUserPosts} />
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
};
export default UserPosts;
