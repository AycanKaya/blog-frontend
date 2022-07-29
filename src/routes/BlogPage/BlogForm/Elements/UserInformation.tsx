import Box from "@mui/material/Box";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import { get, post } from "../../../../api/axios";
import React, { useEffect, useState } from "react";
import ProfileIcons from "./ProfileIcons";
import { Button } from "@mui/material";
import SaveButton from "./SaveButton";
import EditButton from "./EditButton";

interface IUser {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  gender: number;
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
  gender: 0,
  birthDay: new Date(""),
  age: "",
  phoneNumber: "",
  contry: "",
  address: "",
};

const UserInformaiton: React.FC = () => {
  const [value, setValue] = useState("1");

  const [edit, setEdit] = useState(true);

  const [userInfo, setUserInfo] = useState<IUser>(defaultUser);

  function getUserInfo() {
    get("/Account/GetUserInfo").then((response: IUser) => {
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
    <>
      <ProfileIcons userName={userInfo.userName + " " + userInfo.surname} />
      <SaveButton userInfo={userInfo} edit={edit} setEdit={setEdit} />
      <EditButton setEdit={setEdit} />
      <Box
        sx={{
          width: "auto",
          typography: "body1",
          alignItems: "center",
          paddingLeft: "600px",
          paddingTop: "50px",
          display: "inline-table",
          verticalAlign: "baseline",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="User Information Settings" value="1" />
              <Tab label="Account Settings" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProfileSettings
              userInfo={userInfo}
              editable={edit}
              setUserInfo={setUserInfo}
            />
          </TabPanel>

          <TabPanel value="2">
            <AccountSettings userInfo={userInfo} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default UserInformaiton;
