import * as React from 'react';
import { useState, useEffect, PropsWithChildren } from 'react';
import ITag from '../../api/model/tag';
import { getWithout } from '../../api/axios';
import './style.css';

interface Props {
  postId: number;
}

export function PostTags({ postId }: PropsWithChildren<Props>) {
  const [tags, setTags] = useState<ITag[]>([]);

  function getTags() {
    getWithout('/Tag/GetTagsInPost?PostID=' + postId).then((response) => {
      setTags(response.tags);
    });
  }
  useEffect(() => {
    getTags();
  }, [postId]);

  const TagList = tags.map((tag: ITag) => <div className="box">{tag.tagName}</div>);

  return (
    <>
      <div>{TagList}</div>
    </>
  );
}
