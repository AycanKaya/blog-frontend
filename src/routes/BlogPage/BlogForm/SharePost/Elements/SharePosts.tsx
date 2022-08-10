import {
  alpha,
  Box,
  Card,
  Fab,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import * as React from "react";
import { post } from "../../../../../api/axios";
import Modal from "@mui/material/Modal";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "974px",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface IPost {
  title: string;
  content: string;
}

export default function PostSharing() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const [postContent, setPostContent] = React.useState<IPost>({
    title: "",
    content: "",
  });
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent({ ...postContent, title: event.target.value });
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent({ ...postContent, content: event.target.value });
  };

  function handleClickPost() {
    post("/Post/PostUser", postContent)
      .then((response) => {
        if (response.succeeded) {
          setPostContent({ title: "", content: "" });
          return handleOpen();
        }
      })
      .catch((err) => {
        console.log(err);
        return handleOpenError();
      });
  }

  const sx = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "974px",
    maxWidth: "100%",
    marginLeft: "150px",
    marginRight: "150px",
    marginTop: "50px",
    padding: "10px",
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "#8a6d3b",
    bgcolor: "#fcf8e3",
    opacity: 1,
    border: "1px solid #d6e9c6",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };
  const styleSucceed = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "3c763d",
    bgcolor: "#dff0d8",
    opacity: "1",
    border: "1px solid #d6e9c6",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Card sx={sx}>
        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          sx={{ marginTop: "7px", marginBottom: "7px" }}
          rows={1}
          placeholder="Enter a title"
          value={postContent.title}
          onChange={handleChangeTitle}
        />
        <BootstrapInput
          fullWidth
          id="outlined-multiline-static"
          multiline
          sx={{ marginTop: "7px", marginBottom: "7px" }}
          rows={4}
          placeholder="Content"
          value={postContent.content}
          onChange={handleChangeContent}
        />
        <Fab
          variant="extended"
          sx={{ float: "right" }}
          onClick={handleClickPost}
        >
          Post
        </Fab>
      </Card>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={styleSucceed}>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <strong>Success!</strong> Your post has been sent to the Editor
            user. The editor will be open to everyone when the user approves.
          </Typography>
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-description2" sx={{ mt: 2 }}>
            <strong>Warning!</strong> An error occurred while sending your post
            to the Editor user. Please try again.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
