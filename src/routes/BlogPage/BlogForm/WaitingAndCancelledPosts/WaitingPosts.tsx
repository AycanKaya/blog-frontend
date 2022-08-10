import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import { get } from "../../../../api/axios";

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

export default function WaitingPosts() {
  const [expanded, setExpanded] = useState(false);

  const [posts, setPosts] = React.useState<IPost[]>([]);

  function getPosts() {
    get("/Post/WaitingPosts").then((response: any) => {
      setPosts(response.posts.slice(0, 5));
    });
  }
  useEffect(() => {
    getPosts();
  }, []);

  const sx = {
    maxWidth: "fit-content",
    marginLeft: "150px",
    marginRight: "150px",
    marginTop: "50px",
    padding: "10px",
  };
  const postList = posts.map((post: IPost) => (
    <>
      <Card sx={sx}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p className="header1">{post.title}</p>
            {post.content}
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
            title={"Written by " + post.authorName}
            subheader={post.authorEmail}
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
