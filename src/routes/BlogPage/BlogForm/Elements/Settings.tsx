import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProfileIcons from "./ProfileIcons";
import { useEffect, useState } from "react";
import { get } from "../../../../api/axios";
import ProfileSettings from "./ProfileSettings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IUser {
  userID: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
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
  email: "",
  role: "",
  gender: 0,
  birthDay: new Date(""),
  age: "",
  phoneNumber: "",
  contry: "",
  address: "",
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  return (
    <>
      <ProfileIcons userName={"Aycan Kaya"} />
      <Box
        sx={{
          overFlow: "inherit",
          bgcolor: "background.paper",
          display: "flex",
          marginTop: "60px",
          height: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            width: "350px",
            display: "inline-table",
            borderColor: "divider",
            marginTop: "300px",
            marginLeft: "100px",
            overflow: "inherit",
          }}
        >
          <Tab label="User Information Settings" />
          <Tab label="Account Settings" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileSettings
            userInfo={userInfo}
            editable={edit}
            setUserInfo={setUserInfo}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </>
  );
}
