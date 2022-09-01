import { Typography, Card, CardHeader, CardContent, SxProps, Theme, Link } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import IPost from '../../api/model/post';

import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
  let location = useLocation();
  const history = createBrowserHistory();
  if (history.location && history.location.state) {
    history.replace({ ...history.location });
  }
  window.history.replaceState({}, document.title);
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
          subheader={
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                if (location.state) {
                  delete location.state;
                }
                navigate(`../user/${post.authorID}`);
              }}>
              {post.authorEmail}
            </Link>
          }
        />

        {children}
      </CardContent>
    </Card>
  );
}
