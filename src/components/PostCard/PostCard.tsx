import { Typography, Card, CardHeader, CardContent, SxProps, Theme, Link } from '@mui/material';
import { PropsWithChildren } from 'react';
import IPost from '../../api/model/post';

import { useNavigate } from 'react-router-dom';

interface PostProps {
  post: IPost;
  sx?: SxProps<Theme>;
  depth: number;
  isDetail?: boolean;
}

export default function PostCard({
  post,
  sx,
  children,
  depth,
  isDetail
}: PropsWithChildren<PostProps>) {
  let navigate = useNavigate();

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
          {post.content?.length < depth && <>{post.content}</>}
          {post.content?.length > depth && (
            <>
              {post.content.substring(0, 200)}

              <Link
                component="button"
                variant="body2"
                onClick={() => navigate(`/post/${post.postId}`)}>
                {' '}
                ...read more
              </Link>
            </>
          )}
          {post.content?.length < depth && isDetail && (
            <>
              {post.content}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate(`/post/${post.postId}`)}>
                {' '}
                See more details
              </Link>
            </>
          )}
        </Typography>
        <CardHeader
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
        {children}
      </CardContent>
    </Card>
  );
}
