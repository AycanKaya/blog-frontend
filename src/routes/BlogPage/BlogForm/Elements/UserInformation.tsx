import Box from "@mui/material/Box";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccountSettings from "./AccountSettings";
import { get } from "../../../../api/axios";
import React, { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSettings";

interface IUser {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  gender: string;
  birthDay: Date;
  age: string;
  phoneNumber: string;
  contry: string;
  address: string;
}
const defaultUser: IUser = {
  userID: "",
  userName: "",
  name: "",
  surname: "",
  role: "",
  gender: "",
  birthDay: new Date(""),
  age: "",
  phoneNumber: "",
  contry: "",
  address: "",
};

const UserInformaiton: React.FC = () => {
  const [value, setValue] = useState("1");
  const [userInfo, setUserInfo] = useState<IUser>(defaultUser);

  async function getUserInfo() {
    await get("/Account/GetUserInfo").then((response: IUser) => {
      setUserInfo(response);
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "auto",
        typography: "body1",
        alignItems: "center",
        paddingLeft: "500px",
        paddingTop: "50px",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AccountSettings userInfo={userInfo} />
        </TabPanel>
        <TabPanel value="2">
          <ProfileSettings userInfo={userInfo} />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};
export default UserInformaiton;
