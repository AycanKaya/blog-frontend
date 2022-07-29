import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import { post } from "../../../../api/axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

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
interface UserProps {
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const ProfileSettings: React.FC<UserProps> = ({ userInfo, setUserInfo }) => {
  const [editable, setEditable] = useState(true);

  const [user, setUser] = useState<IUser>({
    userID: userInfo.userID,
    userName: userInfo.userName,
    name: userInfo.name,
    surname: userInfo.surname,
    role: userInfo.role,
    gender: userInfo.gender,
    birthDay: userInfo.birthDay,
    age: userInfo.age,
    phoneNumber: userInfo.phoneNumber,
    contry: userInfo.contry,
    address: userInfo.address,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, userName: event.target.value });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value });
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, surname: event.target.value });
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, gender: Number(event.target.value) });
  };
  const handleBirthdayChange = (event: any) => {
    setUser({ ...user, birthDay: event.target.value });
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, age: event.target.value });
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phoneNumber: event.target.value });
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, contry: event.target.value });
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, address: event.target.value });
  };

  function handleEditableChange() {
    setEditable(false);
  }

  function setDefaultValue(date: string) {
    var year = date.substr(0, 4);
    var mounth = date.substr(5, 2);
    var day = date.substr(8, 2);
    return year + "-" + mounth + "-" + day;
  }

  async function updateUser() {
    await post("/Account/UserInfo", user).then((response: IUser) => {
      console.log("Success", response);
    });
  }

  async function updateUserInformation() {
    await updateUser();
    setUserInfo(user);
    setEditable(true);
  }
  const sx = {
    paddingInlineStart: "15px",
    margin: "5px",
    verticalAlign: "baseline",
  };

  return (
    <>
      <div className="borderStyle">
        <p className="social">USERNAME : </p>
        <TextField
          sx={sx}
          id="standard-required"
          InputProps={{ disableUnderline: true }}
          variant="standard"
          value={user.userName}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Name :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={user.name}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleNameChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Surname :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={user.surname}
          InputProps={{ disableUnderline: true }}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSurnameChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        <p className="social">GENDER : </p>

        <FormControl>
          <RadioGroup
            sx={{ display: "-webkit-box", verticalAlign: "baseline" }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={user.gender}
            onChange={(event: any) => handleGenderChange(event)}
          >
            <FormControlLabel
              disabled={editable}
              value={0}
              control={<Radio />}
              label="Kadın"
            />
            <FormControlLabel
              disabled={editable}
              value={1}
              control={<Radio />}
              label="Erkek"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="borderStyle">
        {" "}
        Birthday :
        <TextField
          sx={{ width: 220, verticalAlign: "baseline" }}
          type="date"
          variant="standard"
          defaultValue={setDefaultValue(user.birthDay as unknown as string)}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleBirthdayChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Age :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={user.age}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleAgeChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Phone Number :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={user.phoneNumber}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handlePhoneChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Country :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={user.contry}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleCountryChange(event)
          }
        />
      </div>

      <div className="borderStyle">
        {" "}
        Address :
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={user.address}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleAddressChange(event)
          }
        />
      </div>

      <Button
        variant="outlined"
        disabled={false}
        onClick={updateUserInformation}
      >
        SAVE
      </Button>
      <Button onClick={handleEditableChange}>UPDATE</Button>
    </>
  );
};
export default ProfileSettings;
