import { alpha, Box, Card, Fab, InputBase, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as React from 'react';
import { get, getWithout, post } from '../../api/axios';
import Modal from '@mui/material/Modal';
import './style.css';
import Avatar from '@mui/material/Avatar';
import ITag from '../../api/model/tag';
import { useState } from 'react';
import { Level } from '../../api/model/level';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '974px',
    padding: '10px 12px',
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
  title: string;
  content: string;
}

interface TagOptionType {
  inputValue?: string;
  tagName: string;
}

const sx = {
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  width: '970px', //974
  maxWidth: '100%',
  marginLeft: '150px',
  marginRight: '150px',
  marginTop: '50px',
  padding: '10px'
};
const sxDiv = {
  marginTop: '60px',
  marginBottom: '10px',
  bgcolor: '#1976d257',
  borderRadius: '10px',
  marginLeft: '10px',
  marginRight: '10px',
  width: 'fit-content',
  padding: '5px',
  fontFamily: 'cursive',
  fontSize: 'medium'
};
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '#8a6d3b',
  bgcolor: '#fcf8e3',
  opacity: 1,
  border: '1px solid #d6e9c6',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4
};
const styleSucceed = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '3c763d',
  bgcolor: '#dff0d8',
  opacity: '1',
  border: '1px solid #d6e9c6',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4
};
const filter = createFilterOptions<TagOptionType>();

export function SharePosts() {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const [level, setLevel] = useState<Level>();
  const [tags, setTags] = useState<ITag[]>([]);

  const [postContent, setPostContent] = useState<IPost>({
    title: '',
    content: ''
  });

  const [addTags, setAddTags] = useState<string[]>([]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent({ ...postContent, title: event.target.value });
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent({ ...postContent, content: event.target.value });
  };

  function handleClickPost() {
    post('/Post/PostUser', postContent)
      .then((response) => {
        if (response.succeeded) {
          userLevel();
          setPostContent({ title: '', content: '' });
          createTags(response.post.postId);
          return handleOpen();
        }
      })
      .catch((err) => {
        console.log(err);
        return handleOpenError();
      });
  }

  function userLevel() {
    get('/Account/GetAccountLevel').then((response) => {
      setLevel(response.level);
    });
  }

  function getTags() {
    getWithout('/Tag/AllTags').then((response) => {
      setTags(response.tags);
    });
  }

  function createTags(postId: number) {
    addTags.map((tag) => {
      post('/PostTag/AddTagToPost', { tagName: tag, postID: postId }).then((response) => {
        console.log('add tag to post ', response);
      });
    });

    addTags.splice(0, addTags.length);
    console.log('empty:', addTags);
  }

  React.useEffect(() => {
    userLevel();
    getTags();
  }, []);

  return (
    <>
      <div className="levelLeft">
        <Avatar sx={{ ...sxDiv, marginLeft: '260px' }} variant="square">
          Your Level : {level?.levelName}
        </Avatar>
      </div>

      <div className="levelLeft">
        <Avatar sx={sxDiv} variant="square">
          Total Right to Post : {level?.level}
        </Avatar>
      </div>
      <div className="levelLeft">
        <Avatar sx={sxDiv} variant="square">
          Your Posts : {level?.sumOfPosts}
        </Avatar>
      </div>
      <div className="levelLeft">
        <Avatar sx={sxDiv} variant="square">
          Remaining Right to Post : {level?.rightToPost}
        </Avatar>
      </div>

      <Card sx={sx}>
        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          sx={{ marginTop: '7px', marginBottom: '7px' }}
          rows={1}
          placeholder="Enter a title"
          value={postContent.title}
          onChange={handleChangeTitle}
        />
        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          sx={{ marginTop: '7px', marginBottom: '7px' }}
          rows={4}
          placeholder="Content"
          value={postContent.content}
          onChange={handleChangeContent}
        />
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            id="free-solo-demo"
            multiple
            freeSolo
            handleHomeEndKeys
            clearOnBlur
            options={tags.map((option: any) => option.tagName)}
            onChange={(e: any, newValue: any) => setAddTags(newValue)}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }

              return option.tagName;
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  tagName: 'Add "${params.inputValue}"'
                });
              }

              return filtered;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Topics"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </Stack>

        <Fab variant="extended" sx={{ float: 'right' }} onClick={handleClickPost}>
          Post
        </Fab>
      </Card>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={styleSucceed}>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <strong>Success!</strong> Your post has been sent to the Editor user. The editor will be
            open to everyone when the user approves.
          </Typography>
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography id="keep-mounted-modal-description2" sx={{ mt: 2 }}>
            <strong>Warning!</strong> An error occurred while sending your post to the Editor user.
            Please try again.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
