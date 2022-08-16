import Box from '@mui/material/Box';

import { Tabs, Tab } from '@mui/material';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import { get, post } from '../../../../api/axios';
import { useEffect, useState } from 'react';
import ProfileIcons from './ProfileIcons';
import { Button } from '@mui/material';
import SaveButton from './SaveButton';
import EditButton from './EditButton';
import './style.css';

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
  userID: '',
  userName: '',
  name: '',
  surname: '',
  email: '',
  role: '',
  gender: 0,
  birthDay: new Date(''),
  age: '',
  phoneNumber: '',
  contry: '',
  address: ''
};

const UserInformaiton: React.FC = () => {
  const [value, setValue] = useState('1');

  const [edit, setEdit] = useState(true);

  const [userInfo, setUserInfo] = useState<IUser>(defaultUser);

  function getUserInfo() {
    get('/Account/GetUserInfo').then((response: any) => {
      setUserInfo(response.userInfo);
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
      <ProfileIcons userName={userInfo.userName + ' ' + userInfo.surname} />
      <p className="email">{userInfo.email} </p>
      <Box
        sx={{
          width: 'auto',
          typography: 'body1',
          alignItems: 'center',
          paddingLeft: '600px',
          paddingTop: '25px',
          display: 'inline-table',
          verticalAlign: 'baseline'
        }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '600px'
          }}>
          <Tabs onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Information Settings" value="1" />
            <Tab label="Account Settings" value="2" />
          </Tabs>
        </Box>

        {value === '1' && (
          <ProfileSettings userInfo={userInfo} editable={edit} setUserInfo={setUserInfo} />
        )}
        {value === '2' && <AccountSettings userInfo={userInfo} />}
      </Box>
    </>
  );
};
export default UserInformaiton;
