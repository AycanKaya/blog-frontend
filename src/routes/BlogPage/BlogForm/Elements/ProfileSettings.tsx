import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import { post } from "../../../../api/axios";

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
interface UserProps {
  userInfo: IUser;
}

const ProfileSettings: React.FC<UserProps> = ({ userInfo }) => {
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
    setUser({ ...user, gender: event.target.value });
  };
  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setUser({ ...user, birthDay: event.target.value });
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
  async function updateUser() {
    await post("/Account/UserInfo", user).then((response: IUser) => {
      console.log("Success", response);
    });
  }

  async function updateUserInformation() {
    await updateUser();
    setEditable(true);
  }

  return (
    <>
      <div>
        UserName :
        <TextField
          id="standard-required"
          variant="standard"
          value={user.userName}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
        />
        <IconButton aria-label="edit" onClick={handleEditableChange}>
          <EditIcon />
        </IconButton>
      </div>
      <div>
        {" "}
        Name :
        <TextField
          id="standard-required"
          variant="standard"
          value={user.name}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleNameChange(event)
          }
        />
        <IconButton aria-label="edit" onClick={handleEditableChange}>
          <EditIcon />
        </IconButton>
      </div>
      <div>
        {" "}
        Surname :
        <TextField
          id="standard-required"
          variant="standard"
          value={user.surname}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSurnameChange(event)
          }
        />
        <IconButton aria-label="edit" onClick={handleEditableChange}>
          <EditIcon />
        </IconButton>
      </div>
      <div>
        {" "}
        Gender :
        <TextField
          id="standard-required"
          variant="standard"
          value={user.gender}
          disabled={editable}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleGenderChange(event)
          }
        />
        <IconButton aria-label="edit" onClick={handleEditableChange}>
          <EditIcon />
        </IconButton>
      </div>

      <Button
        variant="outlined"
        disabled={editable}
        onClick={updateUserInformation}
      >
        SAVE
      </Button>
    </>
  );
};
export default ProfileSettings;
