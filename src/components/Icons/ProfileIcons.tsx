import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#E6E6FA';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}
interface PropsUser {
  userName: string;
}

const ProfileIcons: React.FC<PropsUser> = ({ userName }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        {...stringAvatar(userName)}
        sx={{
          width: 150,
          height: 150,
          position: 'absolute',
          marginLeft: '100px',
          marginTop: '100px',
          boxShadow: '#f5ebe0',
          backgroundColor: '#d6ccc2'
        }}
      />
    </Stack>
  );
};
export default ProfileIcons;
