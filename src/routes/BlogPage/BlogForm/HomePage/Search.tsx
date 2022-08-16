import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { get, getWithout } from "../../../../api/axios";
import ITag from "../../../../api/model/tag";
import AllPosts from "./AllPosts";
import IPostComments from "../../../../api/model/postComment";

const Search: React.FC = () => {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const [postComments, setPostComments] = React.useState<IPostComments[]>([]);

  React.useEffect(() => {
    getWithout("/Tag/AllTags").then((response) => {
      console.log(response);
      if (response.succeeded) {
        setTags(response.tags);
      }
      getAllPosts();
    });
  }, []);

  function getAllPosts() {
    get("/Post/PostComments").then((response: any) => {
      setPostComments(response.posts);
    });
  }

  function searchAccordingToTags(event: any, value: ITag[]) {
    if (value == null || value.length == 0) {
      return getAllPosts();
    }
    var search = "";
    value.map((tag: ITag) => {
      search += tag.tagName + "-";
    });
    getWithout("/Tag/GetPostsInTags?tags=" + search).then((response) => {
      setPostComments(response.posts);
    });
  }

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          width: "976px",
          marginLeft: "150px",
          marginRight: "150px",
          marginTop: "50px",
        }}
      >
        <Autocomplete
          multiple
          id="tags-standard"
          options={tags}
          getOptionLabel={(option) => option.tagName}
          onChange={(event, value) => searchAccordingToTags(event, value)}
          renderInput={(params) => (
            <TextField
              sx={{ width: "50%", float: "right" }}
              {...params}
              variant="standard"
              placeholder="Tags"
            />
          )}
        />
      </Stack>
      <AllPosts postComments={postComments} getAllPosts={getAllPosts} />
    </>
  );
};
export default Search;
