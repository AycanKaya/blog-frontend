import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';
import { put, post } from '../../api/axios';
import { useState } from 'react';
import Alerts from '../Messages/Alerts';

export default function ButtonEditor(params: any) {
  const [open, setOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('');
  const handleClick = () => {
    setOpen(true);
  };

  function updateUser(userId: string, body: string) {
    const url = '/Admin/Dashboard?id=' + userId;
    put(url, body).then((respone: any) => {
      console.log(respone);
    });
    updateUserLevel();
  }

  function updateUserLevel() {
    post('/Admin/UserAccountLevelUP', {
      userID: params.data.userID,
      levelName: params.data.level
    }).then((response) => {
      if (response.succeeded === true) {
        setMessageContent('User information updated successfully.');
        setMessageType('success');
        handleClick();
      } else {
        setMessageContent(response.message);
        setMessageType('error');
        handleClick();
      }
    });
  }

  function handleUpdate(params: any) {
    const newarray = params;
    const userId = params.userID;
    const { userID, ...requestBody } = newarray;
    updateUser(userId, requestBody);
  }

  return (
    <>
      <Button
        className="Button"
        size="medium"
        color="primary"
        onClick={(event: any) => handleUpdate(params.data)}
        endIcon={<SaveIcon />}
        variant="contained">
        Save
      </Button>
      <Alerts
        open={open}
        setOpen={setOpen}
        messageContent={messageContent}
        messageType={messageType}></Alerts>
    </>
  );
}
