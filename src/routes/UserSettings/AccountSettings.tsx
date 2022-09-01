import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';
import { post } from '../../api/axios';
import SendIcon from '@mui/icons-material/Send';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import IUserInfo from '../../api/model/userInfo';

interface UserProps {
  userInfo: IUserInfo;
}
interface IRequestPassword {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
const requestBody: IRequestPassword = {
  email: '',
  oldPassword: '',
  password: '',
  confirmPassword: ''
};

const AccountSettings: React.FC<UserProps> = ({ userInfo }) => {
  const [edit, setEdit] = useState(true);
  const [body, setBody] = useState(requestBody);

  interface show {
    oldPassword: boolean;
    password: boolean;
    confirmPassword: boolean;
  }
  const [show, setShow] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    setBody({ ...body, email: userInfo.email });
  }, []);

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody({ ...body, oldPassword: event.target.value });
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody({ ...body, password: event.target.value });
  };
  const handleConfirmPasswodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody({ ...body, confirmPassword: event.target.value });
  };

  function handleEditableChange() {
    setEdit(false);
  }

  function updatePassword() {
    post('/Account/reset-password', body).then((response: any) => {
      if (response.succeeded === true) {
        setBody({
          ...body,
          oldPassword: '',
          password: '',
          confirmPassword: ''
        });
        setEdit(true);
      }
    });
  }
  const handleClickShowOld = () => {
    setShow({ ...show, oldPassword: !show.oldPassword });
  };
  const handleClickShowPassword = () => {
    setShow({ ...show, password: !show.password });
  };
  const handleClickShowConfirm = () => {
    setShow({ ...show, confirmPassword: !show.confirmPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const sx = {
    paddingRight: '5px',
    borderRadius: '8px',
    boxShadow: '#8F8CE7 0px 3px 8px',
    marginBottom: '10px'
  };
  return (
    <Box sx={{ marginLeft: '150px', marginRight: '100px', marginTop: '50px' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <FormControl sx={{ m: 0, width: '28ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ position: 'center' }}>
              Old Password
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-Oldpassword"
              type={show.oldPassword ? 'text' : 'password'}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.oldPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOldPasswordChange(event)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOld}
                    disabled={edit}
                    sx={{ paddingLeft: '6px' }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {show.oldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <FormControl sx={{ m: 0, width: '28ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ position: 'center' }}>
              Password
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-password"
              type={show.password ? 'text' : 'password'}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(event)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    disabled={edit}
                    sx={{ paddingLeft: '6px' }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {show.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <FormControl sx={{ m: 0, width: '28ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ position: 'center' }}>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              sx={sx}
              id="outlined-adornment-Confirmpassword"
              type={show.confirmPassword ? 'text' : 'password'}
              disabled={edit}
              inputProps={{ disableUnderline: true }}
              value={body.confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleConfirmPasswodChange(event)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirm}
                    disabled={edit}
                    sx={{ paddingLeft: '6px' }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {show.confirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>

      <Button
        sx={{
          padding: '4px 20px',
          position: 'initial',
          display: 'inline-table'
        }}
        size="large"
        color="primary"
        variant="contained"
        endIcon={<SendIcon />}
        disabled={edit}
        onClick={updatePassword}>
        SAVE
      </Button>
      <Button
        sx={{
          padding: '5px 20px',
          position: 'initial',
          display: 'inline-table',
          margin: '40px'
        }}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleEditableChange}
        endIcon={<EditIcon />}>
        EDIT
      </Button>
    </Box>
  );
};
export default AccountSettings;
