import * as React from 'react';
import { Button } from '@mui/material';
import { post } from '../../api/axios';
import SendIcon from '@mui/icons-material/Send';
import IUserInfo from '../../api/model/userInfo';

interface UserProps {
  userInfo: IUserInfo;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditör: React.FC<UserProps> = ({ userInfo, edit, setEdit }) => {
  async function updateUser() {
    await post('/Account/UserInfo', userInfo).then((response: IUserInfo) => {
      console.log('Success', response);
    });
  }

  async function updateUserInformation() {
    await updateUser();
    setEdit(!edit);
  }
  const sx = {
    padding: '4px 20px',
    position: 'initial',
    display: 'inline-table',
    margin: '50px',
    marginLeft: '50px'
  };
  return (
    <Button
      sx={sx}
      size="large"
      variant="contained"
      color="primary"
      endIcon={<SendIcon />}
      disabled={edit}
      onClick={updateUserInformation}>
      SAVE
    </Button>
  );
};
export default ButtonEditör;
