import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { width } from "@mui/system";

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
interface UserProps {
  userInfo: IUser;
  editable: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const ProfileSettings: React.FC<UserProps> = ({
  userInfo,
  editable,
  setUserInfo,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, userName: event.target.value });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, name: event.target.value });
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, surname: event.target.value });
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, gender: Number(event.target.value) });
  };
  const handleBirthdayChange = (event: any) => {
    setUserInfo({ ...userInfo, birthDay: event.target.value });
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, age: event.target.value });
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, phoneNumber: event.target.value });
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, contry: event.target.value });
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, address: event.target.value });
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: event.target.value });
  };

  function setDefaultValue(date: string) {
    var year = date.toString().substring(0, 4);
    var mounth = date.toString().substring(5, 2);
    var day = date.toString().substring(8, 2);
    return year + "-" + mounth + "-" + day;
  }

  const sx = {
    padding: "5px",
    paddingInlineStart: "10px",
    borderRadius: "10px",
    width: 200,
    boxShadow: "#3B719F 0px 5px 15px",
    display: "inline-table",
  };

  return (
    <>
      <div className="textDiv">
        <p className="social">Username : </p>
        <TextField
          sx={sx}
          variant="standard"
          size="medium"
          value={userInfo.userName}
          InputProps={{ disableUnderline: true }}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
      </div>
      <div className="textDiv">
        <p className="social">Name : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={userInfo.name}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleNameChange(event)
          }
        />
      </div>

      <div className="textDiv">
        <p className="social">Surname : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.surname}
          InputProps={{ disableUnderline: true }}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSurnameChange(event)
          }
        />
      </div>
      <div className="textDiv">
        <p className="social">Email : </p>
        <TextField
          sx={sx}
          variant="standard"
          size="medium"
          value={userInfo.email}
          InputProps={{ disableUnderline: true }}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleEmailChange(event)
          }
        />
      </div>
      <div className="textDiv">
        <p className="social">Gender : </p>

        <FormControl>
          <RadioGroup
            sx={sx}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={userInfo.gender}
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

      <div className="textDiv">
        <p className="social">Birthday : </p>
        <TextField
          sx={sx}
          type="date"
          size="medium"
          variant="standard"
          defaultValue={setDefaultValue(userInfo.birthDay as unknown as string)}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleBirthdayChange(event)
          }
        />{" "}
      </div>

      <div className="textDiv">
        <p className="social">Age : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.age}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleAgeChange(event)
          }
        />
      </div>

      <div className="textDiv">
        <p className="social">Phone Number : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.phoneNumber}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handlePhoneChange(event)
          }
        />
      </div>

      <div className="textDiv">
        <p className="social">Country : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={userInfo.contry}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleCountryChange(event)
          }
        />
      </div>

      <div className="textDiv">
        <p className="social">Adress : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={userInfo.address}
          disabled={editable}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleAddressChange(event)
          }
        />
      </div>
    </>
  );
};
export default ProfileSettings;
