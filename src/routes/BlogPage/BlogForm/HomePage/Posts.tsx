import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Avatar, Box, Button, CardHeader, Fab, IconButton, Menu, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import { put, deleted } from '../../../../api/axios';
import { isEditable } from '@testing-library/user-event/dist/utils';

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
    padding: '3px',
    margin: '0px',
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

interface IPost {
  postId: number;
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  isApprove: boolean;
  isDeleted: boolean;
  isActive: boolean;
  authorID: string;
  createTime: Date;
  updateTime: Date;
}

interface Props {
  Post: IPost;
  getUserPosts: () => void;
}

const options = ['Delete', 'Update'];

const ITEM_HEIGHT = 48;

const Posts: React.FC<Props> = ({ Post, getUserPosts }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClick = (option: any) => {
    setAnchorEl(null);
    if (option === 'Update') {
      setEditable(!editable);
    }
    if (option === 'Delete') {
      handleClickOpen();
    }
  };

  const [editable, setEditable] = useState(true);
  const [postContent, setPostContent] = useState<IPost>(Post);

  const [body, setBody] = useState({
    postId: Post.postId,
    title: postContent.title,
    content: postContent.content,
    isActive: true
  });

  function UpdatePost() {
    put('/Post/UpdatePost', body)
      .then((response) => {
        console.log(response);
        setEditable(!editable);
      })
      .catch((err) => {
        console.log(err);
        setEditable(!editable);
      });
  }

  function DeletePost() {
    deleted('/Post/DeletePost?id=' + Post.postId)
      .then((response) => {
        getUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClick = (event: any) => {
    UpdatePost();
  };

  const setEdit = (event: any) => {
    setEditable(!editable);
  };
  const onTitleChange = (event: any) => {
    setPostContent({ ...postContent, title: event.target.value });
    setBody({ ...body, title: postContent.title });
  };

  const onContentChange = (event: any) => {
    setPostContent({ ...postContent, content: event.target.value });
    setBody({ ...body, content: postContent.content });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ display: 'block' }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: red[500],
                width: '20px',
                height: '20px'
              }}
              aria-label="recipe"></Avatar>
          }
          sx={{
            bottom: 0,
            display: '-webkit-inline-box',
            fontSize: '10px',
            width: '150px',
            float: 'left'
          }}
          titleTypographyProps={{ fontSize: '0.657rem' }}
          title={'Written by ' + Post.authorName}
          subheader={Post.authorEmail}
        />
        <div>
          <IconButton
            sx={{ float: 'right' }}
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button'
            }}
            sx={{ float: 'left' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
                float: 'left'
              }
            }}>
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === 'Update'}
                onClick={(event) => handleOnClick(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={1}
          placeholder="Enter a title"
          value={postContent.title}
          onChange={onTitleChange}
          disabled={editable}
        />
        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder="Content"
          value={postContent.content}
          onChange={onContentChange}
          disabled={editable}
        />
        {!editable && (
          <Fab variant="extended" sx={{ float: 'right' }} disabled={editable} onClick={onClick}>
            Post
          </Fab>
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent
          sx={{
            backgroundColor: 'rgb(229, 246, 253)'
          }}>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'rgb(1, 67, 97)' }}>
            Are you sure you want to <strong> delete </strong> this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'block',
            backgroundColor: 'rgb(229, 246, 253)'
          }}>
          <Button onClick={handleCloseDialog} sx={{ float: 'left' }}>
            Disagree
          </Button>
          <Button onClick={DeletePost} sx={{ float: 'right' }} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Posts;
