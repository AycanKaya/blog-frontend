import { FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import './style.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IUserInfo from '../../api/model/userInfo';
import SaveButton from '../../components/Buttons/SaveButton';
import EditButton from '../../components/Buttons/EditButton';

interface UserProps {
  userInfo: IUserInfo;
  editable: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

const ProfileSettings: React.FC<UserProps> = ({ userInfo, editable, setUserInfo }) => {
  const [edit, setEdit] = useState(true);

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
    console.log(date);
    var year = date.substr(0, 4);
    var mounth = date.substr(5, 2);
    var day = date.substr(8, 2);
    console.log(year, ' ', mounth, ' ', day);
    return year + '-' + mounth + '-' + day;
  }

  const sx = {
    padding: '3px',
    paddingInlineStart: '10px',
    borderRadius: '10px',
    width: 200,
    boxShadow: '#3B719F 0px 3px 8px',
    display: 'inline-table'
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
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
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
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleNameChange(event)}
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
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSurnameChange(event)}
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
          disabled={edit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
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
            onChange={(event: any) => handleGenderChange(event)}>
            <FormControlLabel disabled={edit} value={0} control={<Radio />} label="Kadın" />
            <FormControlLabel disabled={edit} value={1} control={<Radio />} label="Erkek" />
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
          defaultValue={setDefaultValue(userInfo.birthDay.toString())}
          disabled={edit}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleBirthdayChange(event)}
        />{' '}
      </div>

      <div className="textDiv">
        <p className="social">Age : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          size="medium"
          value={userInfo.age}
          disabled={edit}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAgeChange(event)}
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
          disabled={edit}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(event)}
        />
      </div>

      <div className="textDiv">
        <p className="social">Country : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={userInfo.contry}
          disabled={edit}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCountryChange(event)}
        />
      </div>

      <div className="textDiv">
        <p className="social">Adress : </p>
        <TextField
          sx={sx}
          id="standard-required"
          variant="standard"
          value={userInfo.address}
          disabled={edit}
          InputProps={{ disableUnderline: true }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(event)}
        />
      </div>
      <SaveButton userInfo={userInfo} edit={edit} setEdit={setEdit} />
      <EditButton setEdit={setEdit} />
    </>
  );
};
export default ProfileSettings;
