import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

export default function Auth0LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: 'login',
      appState: {
        returnTo: '/profile'
      }
    });
  };

  return (
    <Button variant="contained" type="submit" onClick={handleLogin}>
      Log In With
    </Button>
  );
}
