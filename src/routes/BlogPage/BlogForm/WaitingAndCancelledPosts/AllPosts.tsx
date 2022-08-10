import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserPosts from "../SharePost/Elements/UserPosts";
import WaitingPosts from "./WaitingPosts";
import CancelledPosts from "./CancelledPosts";
import UserPostsDeneme from "./UserPostsDeneme";
export default function AllPosts() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",

        marginTop: "50px",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#ffff",
          }}
        >
          <TabList
            sx={{ borderColor: "#5989b4a9" }}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Shared Posts" value="1" />
            <Tab label="Waiting Posts" value="2" />
            <Tab label="Cancelled Posts" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserPostsDeneme />
        </TabPanel>
        <TabPanel value="2">
          <WaitingPosts />
        </TabPanel>
        <TabPanel value="3">
          <CancelledPosts />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
