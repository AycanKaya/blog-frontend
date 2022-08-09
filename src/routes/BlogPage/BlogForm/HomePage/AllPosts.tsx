import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import { get } from "../../../../api/axios";

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
  content: string;
  authorName: string;
  created: Date;
}
interface IPostComments {
  post: IPost;
  comments: IComment[];
}
export default function AllPosts() {
  const [expanded, setExpanded] = useState(false);

  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  function getRecentFivePosts() {
    get("/Post/PostComments").then((response: any) => {
      setPostComments(response.posts);
    });
  }
  useEffect(() => {
    getRecentFivePosts();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

          <ExpandMore
            sx={{ float: "right" }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <p className="social">COMMENTS</p>
          </ExpandMore>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {postComment.comments.map((comment: IComment) => (
              <Card
                sx={{
                  maxWidth: "fit-content",
                  borderRadius: "0px",
                  boxShadow: "0",
                }}
              >
                <CardHeader
                  sx={{ margin: "0px", padding: "0px", fontSize: "15px" }}
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
                  title={comment.authorName}
                  subheader={comment.created.toString()}
                />

                <CardContent sx={{ padding: "0px" }}>
                  <Typography
                    color="text."
                    sx={{ fontSize: "12px", padding: "7px" }}
                  >
                    <Box key={comment.id}>
                      <div key={comment.id}>{comment.content}</div>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Collapse>
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
