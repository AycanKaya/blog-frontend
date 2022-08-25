import { Typography, Card, CardHeader, CardContent, IconButton, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PropsWithChildren, useState } from 'react';
import IPost from '../../api/model/post';
import { red } from '@mui/material/colors';

interface PostProps {
  post: IPost;
}

export default function PostCard({ post }: PropsWithChildren<PostProps>) {
  const sx = {
    maxWidth: 'fit-content',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '50px',
    padding: '10px'
  };

  return (
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
                width: '20px',
                height: '20px'
              }}
              aria-label="recipe"></Avatar>
          }
          sx={{
            bottom: 0,

            fontSize: '10px',
            width: 'auto',
            float: 'right'
          }}
          titleTypographyProps={{ fontSize: '0.657rem' }}
          title={'Written by ' + post.authorName}
          subheader={post.authorEmail}
        />
      </CardContent>
    </Card>
  );
}
