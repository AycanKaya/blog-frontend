import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import { get } from '../../api/axios';
import { useEffect, useState } from 'react';
import ProfileIcons from '../../components/Icons/ProfileIcons';
import './style.css';
import IUserInfo from '../../api/model/userInfo';
import { SharedPosts } from './UserPosts/SharedPosts';
import IPost from '../../api/model/post';
import { WaitingPosts } from './UserPosts/WaitingPosts';
import { CanceledPosts } from './UserPosts/CanceledPosts';
import { UserLevelInformation } from './UserPosts/UserLevelInformation';
import { useLocation } from 'react-router-dom';

const defaultUser: IUserInfo = {
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

const UserSettings: React.FC = () => {
  let location = useLocation();
  var userEmail = location.state;
  const [value, setValue] = useState('1');

  const [edit, setEdit] = useState(true);

  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUser);

  const [posts, setPosts] = useState<IPost[]>([]);

  const [waitingPosts, setWaitingPosts] = useState<IPost[]>([]);
  const [canceledPosts, setCanceledPosts] = useState<IPost[]>([]);

  async function getUserInfoByEmail() {
    await get('/Account/GetUserInfo?email=' + String(userEmail)).then((response: any) => {
      setUserInfo(response.userInfo);
    });
  }
  function getUserPosts() {
    get('/Post/SharedPosts?email=' + String(userEmail)).then((response: any) => {
      setPosts(response.posts);
    });
  }
  async function getWaitingPosts() {
    await get('/Post/WaitingPosts?email=' + String(userEmail)).then((response: any) => {
      setWaitingPosts(response.posts);
    });
  }
  function getCanceledPosts() {
    get('/Post/CancelledPosts').then((response: any) => {
      setCanceledPosts(response.posts);
    });
  }

  useEffect(() => {
    getUserInfoByEmail();
    getUserPosts();
    getWaitingPosts();
    getCanceledPosts();
  }, [userEmail]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ProfileIcons userName={userInfo.userName + ' ' + userInfo.surname} />

      <UserLevelInformation userEmail={String(userEmail)} />
      <Box
        sx={{
          alignItems: 'center',
          paddingLeft: '480px',
          paddingTop: '20px',
          display: 'inline-table',
          verticalAlign: 'baseline',
          width: '650px'
        }}>
        <Tabs
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="User Information Settings" value="1" />
          {userInfo.userID === localStorage.getItem('id') && (
            <Tab label="Account Settings" value="2" />
          )}
          <Tab label="Shared Posts" value="3" />
          {userInfo.userID === localStorage.getItem('id') && (
            <Tab label="Waiting Posts" value="4" />
          )}
          {userInfo.userID === localStorage.getItem('id') && (
            <Tab label="Canceled Posts" value="5" />
          )}
        </Tabs>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          paddingLeft: '500px',

          display: 'inline-table',
          verticalAlign: 'baseline'
        }}>
        {value === '1' && (
          <ProfileSettings userInfo={userInfo} editable={edit} setUserInfo={setUserInfo} />
        )}
        {value === '2' && <AccountSettings userInfo={userInfo} />}
        {value === '3' && <SharedPosts posts={posts} />}
        {value === '4' && <WaitingPosts posts={waitingPosts} />}
        {value === '5' && <CanceledPosts posts={canceledPosts} />}
      </Box>
    </>
  );
};
export default UserSettings;
