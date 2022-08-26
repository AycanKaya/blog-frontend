import { Typography, Card, CardHeader, CardContent, Avatar, SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';
import IPost from '../../api/model/post';
import { red } from '@mui/material/colors';

interface PostProps {
  post: IPost;
  sx?: SxProps<Theme>;
}

export default function PostCard({ post, sx }: PropsWithChildren<PostProps>) {
  const sxDefault = {
    maxWidth: 'fit-content',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '50px',
    padding: '10px'
  };

  return (
    <Card sx={sx || sxDefault}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <p className="header1">{post.title}</p>
          {post.content?.length > 200 && (
            <>
              {post.content.substring(0, 200)}

              <a href="#"> ...read more</a>
            </>
          )}
          {post.content?.length < 200 && (
            <>
              {post.content}
              <a href="#"> ...see more details</a>
            </>
          )}
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
