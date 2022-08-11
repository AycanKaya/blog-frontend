import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useEffect } from "react";
import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import { get } from "../../../../api/axios";
import Comments from "../WaitingAndCancelledPosts/Comments";

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
const AllPosts: React.FC = () => {
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getAllPosts() {
    get("/Post/PostComments").then((response: any) => {
      console.log("ÇALISTI", response);

      setPostComments(response.posts);
    });
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  const sx = {
    maxWidth: "fit-content",
    marginLeft: "150px",
    marginRight: "150px",
    marginTop: "50px",
    padding: "10px",
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
                  width: "20px",
                  height: "20px",
                }}
                aria-label="recipe"
              ></Avatar>
            }
            sx={{
              bottom: 0,

              fontSize: "10px",
              width: "auto",
              float: "right",
            }}
            titleTypographyProps={{ fontSize: "0.657rem" }}
            title={"Written by " + postComment.post.authorName}
            subheader={postComment.post.authorEmail}
          />
          <Comments
            comments={postComment.comments}
            postId={postComment.post.postId}
            getRecentFivePosts={getAllPosts}
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
export default AllPosts;
