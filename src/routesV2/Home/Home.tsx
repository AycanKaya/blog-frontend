import { Container, Grid } from '@mui/material';

import BlogCard from '../../components/BlogCard';
import usePosts from './usePosts';

export default function Home() {
  const { data } = usePosts();

  if (!data.length) return <div>loading</div>;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {data.map(({ post }) => (
            <div style={{ marginBottom: 12 }}>
              <BlogCard title={post.title} author={post.authorName} content={post.content} />
            </div>
          ))}
        </Grid>
        <Grid item xs={4}>
          sasasaa
        </Grid>
      </Grid>
    </Container>
  );
}
