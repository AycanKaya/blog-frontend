import { Typography, TextField, Button, alpha, InputBase, styled } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { post } from '../../../../api/axios';
import Comment from './Comment';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    display: 'block',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: 'none',
    fontSize: 16,
    width: '960px',
    padding: '0',
    margin: '0',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  authorId: string;
  created: Date;
}

interface Props {
  postId: number;
  comments: IComment[];
  getRecentFivePosts: () => void; //ismi düzelt !!!!
}

interface requestBody {
  content: string;
  postID: number;
}
const options = ['Delete', 'Update'];

const ITEM_HEIGHT = 48;

const Comments: React.FC<Props> = ({ postId, comments, getRecentFivePosts }) => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const commentList = comments.map((comment: IComment) => (
    <div>
      <Comment commentObject={comment} getPosts={getRecentFivePosts} />
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
};
export default Comments;
