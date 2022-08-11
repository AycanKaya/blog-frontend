import {
  Card,
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { post } from "../../../../api/axios";
import MenuForComment from "./MenuForComment";

interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
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
const options = ["Delete", "Update"];

const ITEM_HEIGHT = 48;

const Comments: React.FC<Props> = ({
  postId,
  comments,
  getRecentFivePosts,
}) => {
  const [reply, setReply] = useState("");

  const [body, setBody] = useState<requestBody>({
    content: "",
    postID: postId,
  });

  const onClick = () => {
    post("/Comment/ShareComment", body)
      .then((response) => {
        setReply("");
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
    marginTop: "20px",
    border: "none",
    borderBottom: "0",
    boxShadow: "0",
    width: "500px",
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
    <Card
      sx={{
        maxWidth: "fit-content",
        borderRadius: "0px",
        boxShadow: "0",
      }}
    >
      <CardHeader
        sx={{ margin: "0px", padding: "0px", fontSize: "15px" }}
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
        title={comment.authorName}
        subheader={comment.created.toString()}
      />

      <MenuForComment commentId={comment.id} getPosts={getRecentFivePosts} />

      <CardContent sx={{ padding: "0px", minWidth: "500px" }}>
        <Typography color="text." sx={{ fontSize: "12px", padding: "7px" }}>
          <Box key={comment.id}>
            <div key={comment.id}>{comment.content}</div>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  ));

  return (
    <Accordion sx={sx}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
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
          float: "right",
          margin: "5px",
          background: "rgb(120, 86, 255)",
          color: "#ffff",
          borderWidth: "1px",
          borderRadius: "9999px",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
        onClick={onClick}
      >
        Reply
      </Button>
    </Accordion>
  );
};
export default Comments;
