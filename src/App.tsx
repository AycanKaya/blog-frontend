import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#3B719F',
      contrastText: '#fafdff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-y-mn-g3v.us.auth0.com"
          clientId="P7ho17R77PqNQQ2tz2DPPtGHBEueXOyr"
          redirectUri="http://localhost:3000/callback"
          audience="https://blogserver.com">
          <Routes />
        </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
//  redirectUri={window.location.origin}
