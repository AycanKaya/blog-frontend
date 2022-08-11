import {
  InputBase,
  alpha,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  styled,
  Fab,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { put } from "../../../../api/axios";
import MenuForComment from "./MenuForComment";
import "./style.css";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    display: "block",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "none",
    fontSize: 16,
    width: "960px",
    padding: "0",
    margin: "0",
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

interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  created: Date;
}

interface Props {
  commentObject: IComment;
  getPosts: () => void;
}
const CommentCard: React.FC<Props> = ({ commentObject, getPosts }) => {
  const [rowNumber, setRowNumber] = useState(1);
  const [isEdit, setIsEdit] = useState(true);
  const [updatedCommentBody, setUpdatedCommentBody] =
    useState<IComment>(commentObject);

  const onChangeCommentBody = (event: any) => {
    setUpdatedCommentBody({
      ...updatedCommentBody,
      content: event.target.value,
    });
  };
  function handleUpdateComment() {
    setIsEdit(!isEdit);
    if (rowNumber == 1) setRowNumber(4);
    else if (rowNumber == 4) setRowNumber(1);
  }

  function UpdateComment() {
    put("/Comment/UpdateComment", {
      commentID: commentObject.id,
      content: updatedCommentBody.content,
    })
      .then((response) => {
        if (response.succeeded) {
          console.log(response);
          getPosts();
          handleUpdateComment();
        }
        if (!response.succeeded) {
          console.log("ERRORRESPONSE", response);
          handleUpdateComment();
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        handleUpdateComment();
      });
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: "fit-content",
          borderRadius: "0px",
          boxShadow: "0",
        }}
      >
        <CardHeader
          sx={{
            margin: "0px",
            padding: "0px",
            fontSize: "15px",
            position: "absolute",
          }}
          avatar={
            <Avatar
              sx={{
                bgcolor: red[500],
                width: "20px",
                height: "20px",
              }}
              aria-label="recipe"
            ></Avatar>
          }
          title={commentObject.authorName}
          subheader={commentObject.created.toString()}
        />

        <MenuForComment
          commentId={updatedCommentBody.id}
          getPosts={getPosts}
          handleUpdateComment={handleUpdateComment}
        />

        <CardContent sx={{ padding: "0px", minWidth: "400px" }}>
          <BootstrapInput
            sx={{ fontSize: "12px", padding: "7px" }}
            rows={rowNumber}
            fullWidth
            id={updatedCommentBody.id.toString()}
            multiline
            placeholder="Enter a title"
            value={updatedCommentBody.content}
            onChange={onChangeCommentBody}
            disabled={isEdit}
          />
        </CardContent>
        <Fab
          variant="extended"
          className="css-1sltwf-MuiButtonBase-root-MuiFab-root.Mui-disabled"
          sx={{ float: "right", width: "60px", height: "40px" }}
          disabled={isEdit}
          onClick={UpdateComment}
        >
          Reply
        </Fab>
      </Card>
    </>
  );
};
export default CommentCard;
