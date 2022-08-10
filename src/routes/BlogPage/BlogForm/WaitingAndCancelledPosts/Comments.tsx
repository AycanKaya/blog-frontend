import {
  Card,
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  created: Date;
}
interface Props {
  comments: IComment[];
}

const Comments: React.FC<Props> = ({ comments }) => {
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

      <CardContent sx={{ padding: "0px" }}>
        <Typography color="text." sx={{ fontSize: "12px", padding: "7px" }}>
          <Box key={comment.id}>
            <div key={comment.id}>{comment.content}</div>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  ));

  const sx = {
    marginTop: "20px",
    border: "none",
    borderBottom: "0",
    boxShadow: "0",
    width: "500px",
  };

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
    </Accordion>
  );
};
export default Comments;
