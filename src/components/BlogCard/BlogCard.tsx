import { Typography, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PropsWithChildren } from 'react';

interface BlogCardProps {
  userCanEdit?: boolean;
  title: string;
  author: string;
  content?: string;
}

export default function BlogCard({
  userCanEdit,
  title,
  author,
  content,
  children
}: PropsWithChildren<BlogCardProps>) {
  return (
    <Card>
      <CardHeader
        action={
          userCanEdit && (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={title}
        subheader={author}
      />
      <CardContent>
        <Typography>{content}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}
