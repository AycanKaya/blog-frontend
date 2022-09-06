import { PropsWithChildren, useEffect, useState } from 'react';
import IPost from '../../../api/model/post';
import PostCard from '../../../components/PostCard/PostCard';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  posts: IPost[];
}

export function WaitingPosts({ posts }: PropsWithChildren<Props>) {
  let navigate = useNavigate();
  // User is currently on this page
  const [page, setPage] = useState(1);

  const [pageContent, setPageContent] = useState<JSX.Element[]>([]);

  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const pageCount = Math.ceil(posts.length / recordsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
    console.log('PAGE COUNT: ', pageCount);
  };

  useEffect(() => {
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [page]);

  const sx = {
    maxWidth: '700px',
    minWidth: '700px',
    marginTop: '10px',
    padding: '0px'
  };

  const postList = posts.map((post: IPost) => <PostCard post={post} sx={sx} depth={140} />);

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ alignSelf: 'self-end' }}
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
      {posts !== null && <Typography>{pageContent}</Typography>}
      {posts.length === 0 && (
        <Typography sx={{ minWidth: 'fit-content' }}>
          <p style={{ fontFamily: ' Verdana, Geneva, Tahoma, sans-serif' }}>No pending posts.</p>
        </Typography>
      )}
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
