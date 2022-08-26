import { Typography, TextField, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PropsWithChildren, useState } from 'react';
import { post } from '../../api/axios';
import IComment from '../../api/model/comment';
import CommentCard from '../../components/CommentCard/CommentCard';

interface requestBody {
  content: string;
  postID: number;
}

interface Props {
  postId: number;
  comments: IComment[];
  getRecentFivePosts: () => void;
}

export function Comments({ postId, comments, getRecentFivePosts }: PropsWithChildren<Props>) {
  const [reply, setReply] = useState('');

  const [body, setBody] = useState<requestBody>({
    content: '',
    postID: postId
  });

  const onClick = () => {
    post('/Comment/ShareComment', body)
      .then((response) => {
        setReply('');
        getRecentFivePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event: any) => {
    setReply(event.target.value);
    setBody({ ...body, content: reply });
  };

  const sx = {
    marginTop: '20px',
    border: 'none',
    borderBottom: '0',
    boxShadow: '0',
    width: '500px'
  };

  const commentList = comments.map((comment: IComment) => (
    <div>
      <CommentCard commentObject={comment} getPosts={getRecentFivePosts} />
    </div>
  ));

  return (
    <Accordion sx={sx}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>Comments</Typography>
      </AccordionSummary>
      <AccordionDetails>{commentList}</AccordionDetails>
      <TextField
        fullWidth
        multiline
        placeholder="your reply"
        id="fullWidth"
        value={reply}
        onChange={handleChange}
      />

      <Button
        sx={{
          float: 'right',
          margin: '5px',
          background: 'rgb(120, 86, 255)',
          color: '#ffff',
          borderWidth: '1px',
          borderRadius: '9999px',
          fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
        }}
        onClick={onClick}>
        Reply
      </Button>
    </Accordion>
  );
}
