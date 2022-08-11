import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleted } from "../../../../api/axios";
import DialogMessage from "./DialogMessage";
import { SnackbarOrigin } from "@mui/material";
import ErrorMessages from "./ErrorMessages";

const options = ["Delete", "Update"];

const ITEM_HEIGHT = 48;

interface Props {
  commentId: number;
  getPosts: () => void;
}
export interface State extends SnackbarOrigin {
  open: boolean;
}
const MenuForComment: React.FC<Props> = ({ commentId, getPosts }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorState, setErrorState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleError = (newState: SnackbarOrigin) => () => {
    setErrorState({ open: true, ...newState });
  };

  const handleOnClick = (option: any) => {
    setAnchorEl(null);
    if (option === "Update") {
    }
    if (option === "Delete") {
      setOpenDialog(true);
    }
  };

  const [errorMessage, setErrorMessage] = React.useState("");
  function DeleteComment() {
    deleted("/Comment/DeleteComment?commentID=" + commentId)
      .then((response) => {
        if (!response.succeeded) {
          setErrorMessage(response.err);
          handleError({
            vertical: "top",
            horizontal: "center",
          });
          setErrorState({ ...errorState, open: true });
        }

        getPosts();
      })
      .catch((err) => {
        console.log("ERROR", err);
        setErrorMessage(err.response.data.Error);
        handleError({
          vertical: "top",
          horizontal: "center",
        });

        setErrorState({ ...errorState, open: true });
      });
  }

  return (
    <>
      <div>
        <IconButton
          sx={{ float: "right" }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          sx={{ float: "left" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
              float: "left",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Update"}
              onClick={(event) => handleOnClick(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <DialogMessage
        Delete={DeleteComment}
        object={"comment"}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
      <ErrorMessages
        errorState={errorState}
        setErrorState={setErrorState}
        errorMessage={errorMessage}
      />
    </>
  );
};
export default MenuForComment;
