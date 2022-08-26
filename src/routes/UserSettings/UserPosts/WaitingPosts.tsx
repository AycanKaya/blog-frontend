import { PropsWithChildren, useEffect, useState } from 'react';
import IPost from '../../../api/model/post';
import PostCard from '../../../components/PostCard/PostCard';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
  posts: IPost[];
}

export function WaitingPosts({ posts }: PropsWithChildren<Props>) {
  // User is currently on this page
  const [page, setPage] = useState(1);

  const [pageContent, setPageContent] = useState<JSX.Element[]>([]);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const pageCount = Math.ceil(posts.length / recordsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
  };

  useEffect(() => {
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [page]);

  const sx = {
    maxWidth: '600px',
    minWidth: '600px',
    marginLeft: '80px',
    marginRight: '80px',
    marginTop: '10px',
    padding: '0px'
  };

  const postList = posts.map((post: IPost) => <PostCard post={post} sx={sx} />);

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ alignSelf: 'self-end' }}
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
      <Typography>{pageContent}</Typography>
      {pageCount > 1 && (
        <Pagination
          sx={{ alignSelf: 'self-end' }}
          count={pageCount}
          page={page}
          onChange={handleChange}
        />
      )}
    </Stack>
  );
}
