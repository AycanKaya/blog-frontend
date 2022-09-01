import './style.css';
import { Box } from '@mui/material';
import { get } from '../../../api/axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Level } from '../../../api/model/level';
interface Props {
  userID: string;
}
export function UserLevelInformation({ userID }: PropsWithChildren<Props>) {
  const [level, setLevel] = useState<Level>();

  function userLevel() {
    get('/Account/GetAccountLevel?id=' + userID).then((response) => {
      setLevel(response.level);
    });
  }
  useEffect(() => {
    userLevel();
  }, []);

  return (
    <Box>
      <p className="header">
        <strong>Level : {level?.levelName}</strong>
      </p>
      <p className="header2">
        <strong>Total Right to Post : {level?.level}</strong>
      </p>
      <p className="header3">
        <strong>Post Count : {level?.sumOfPosts}</strong>
      </p>
      <p className="header4">
        <strong>Remaining Right to Post :{level?.rightToPost}</strong>
      </p>
    </Box>
  );
}
