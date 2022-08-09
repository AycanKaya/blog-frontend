import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { getWithout } from "../../../api/axios";
import internal from "stream";

interface ITag {
  id: number;
  tagName: string;
}

export default function Search() {
  const [tags, setTags] = React.useState<ITag[]>([]);

  React.useEffect(() => {
    getWithout("/Tag/AllTags").then((response) => {
      console.log(response);
      if (response.succeeded) {
        setTags(response.tags);
      }
    });
  }, []);

  return (
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
  );
}
