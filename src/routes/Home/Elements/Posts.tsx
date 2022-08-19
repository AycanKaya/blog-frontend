import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { getWithout } from "../../../api/axios";
import { useEffect } from "react";
import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import Comments from "../../BlogPage/BlogForm/WaitingAndCancelledPosts/Comments";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IPost {
  id: number;
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
  authorId: string;
  created: Date;
}
interface IPostComments {
  post: IPost;
  comments: IComment[];
}
const Posts: React.FC = () => {
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getRecentFivePosts() {
    getWithout("/Post/PostComments").then((response: any) => {
      setPostComments(response.posts.slice(0, 5));
    });
  }
  useEffect(() => {
    getRecentFivePosts();
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
            postId={postComment.post.id}
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
