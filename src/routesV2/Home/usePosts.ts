import { useEffect, useState } from 'react';

import { getPosts, Post } from '../../api/service/posts';

export default function usePosts() {
  const [data, setData] = useState<Post[]>([]);

  async function getData() {
    const result = await getPosts();
    if (!result) return;

    setData(result);
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    data
  };
}
