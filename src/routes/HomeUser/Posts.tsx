import { Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { PropsWithChildren, useEffect, useState } from 'react';

interface Props {
  postList: JSX.Element[];
}
export function Posts({ postList }: PropsWithChildren<Props>) {
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState<JSX.Element[]>([]);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const pageCount = Math.ceil(postList.length / recordsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
  };

  useEffect(() => {
    setPageContent(postList.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [indexOfFirstRecord, indexOfLastRecord, postList]);

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ alignSelf: 'self-start', marginLeft: '150px' }}
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
      <Typography>{pageContent}</Typography>
      {pageCount > 1 && (
        <Pagination
          sx={{ marginLeft: '150px', alignSelf: 'self-start' }}
          count={pageCount}
          page={page}
          onChange={handleChange}
        />
      )}
    </Stack>
  );
}
