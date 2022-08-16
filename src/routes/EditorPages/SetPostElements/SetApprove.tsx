import { get, post } from "../../../api/axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, createTheme, Fab, ThemeProvider } from "@mui/material";
import React from "react";
interface IPost {
  postId: number;
  title: string;
  content: string;
  isApprove: boolean;
  authorID: string;
  createTime: Date;
  updateTime: Date;
}
interface IRow {
  authorName: string;
  authorEmail: string;
  post: IPost;
}

interface Props {
  getAllUserInfo: () => void;
}

const SetApprove: React.FC<Props> = (params: any, props: Props) => {
  async function ActivateRequest(body: any) {
    await post("/EditorUser/ActivateControl", body).then((response) => {
      console.log(response);
      props.getAllUserInfo();
    });
  }

  function handleConfirmClick() {
    ActivateRequest({ postID: params.postId, isApprove: true });
  }
  function handleCancelClick() {
    ActivateRequest({ postID: params.postId, isApprove: false });
  }

  return (
    <Box sx={{ "& > :not(style)": { m: 0.3 } }}>
      <Fab color="primary" aria-label="add" onClick={handleConfirmClick}>
        <CheckIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit" onClick={handleCancelClick}>
        <ClearIcon />
      </Fab>
    </Box>
  );
};
export default SetApprove;
