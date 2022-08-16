import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import './App.css';

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
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
