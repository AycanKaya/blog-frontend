import * as React from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import WaitingPosts from './WaitingPosts';
import CancelledPosts from './CancelledPosts';
import UserPosts from './UserPosts';

export default function AllPosts() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',

        marginTop: '50px',
        typography: 'body1'
      }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: '#ffff'
        }}>
        <Tabs
          sx={{ borderColor: '#5989b4a9' }}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="lab API tabs example"
          centered>
          <Tab label="Shared Posts" value="1" />
          <Tab label="Waiting Posts" value="2" />
          <Tab label="Cancelled Posts" value="3" />
        </Tabs>
      </Box>
      {value === '1' && <UserPosts />}
      {value === '2' && <WaitingPosts />}
      {value === '3' && <CancelledPosts />}
    </Box>
  );
}
