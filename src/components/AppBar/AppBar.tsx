import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '../Buttons/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import Authenticate from './Authenticate';
import { useEffect } from 'react';
import IUserInfo from '../../api/model/userInfo';

export interface PostValues {
  title: string;
  content: string;
}
const pages = ['Home Page', 'Share Post'];
let settings = ['Settings'];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const { isAuthenticate, setIsAuthenticate, user } = Authenticate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = (event: React.MouseEvent<HTMLElement>, setting: string) => {
    setAnchorElUser(event.currentTarget);
    if (setting === 'Logout') {
      setIsAuthenticate(false);
      localStorage.clear();
      settings = ['Settings'];

      navigate('../login');
    }
    if (setting === 'Settings') {
      if (user !== undefined) navigate(`../user/${user.userName}`, { state: user?.email });
    }
    if (setting === 'Dashboard') {
      navigate('../dashboard');
    }
    if (setting === 'Post Settings') {
      navigate('../editorPostSettings');
    }
  };

  const handleLogout2 = (event: React.MouseEvent<HTMLElement>, pages: string) => {
    setAnchorElNav(null);
    if (pages === 'Home Page') {
      navigate('../home');
    }
    if (pages === 'Share Post') {
      navigate('../sharePost');
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthenticate && !settings.includes('Logout')) {
      settings.push('Logout');

      if (localStorage.getItem('userRole') === 'Admin' && !settings.includes('Dashboard')) {
        settings.push('Dashboard');
      }
      if (localStorage.getItem('userRole') === 'Editor' && !settings.includes('Post Settings')) {
        settings.push('Post Settings');
      }
    }
  }, [isAuthenticate]);

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl" color="AppBar">
          <Toolbar disableGutters>
            <EmojiNatureIcon
              sx={{
                display: {
                  xs: 'none',
                  md: 'initial',
                  fontSize: '55px',
                  color: '#D8DCD6'
                },
                mr: 2
              }}
            />
            {isAuthenticate && (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={(event) => handleLogout2(event, page)}
                      sx={{ my: 2, color: 'white', display: 'block' }}>
                      {page}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, my: 2, color: 'white' }}>
                      <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          onClick={(event) => handleLogout(event, setting)}
                          textAlign="center">
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}

            {!isAuthenticate && (
              <Box sx={{ flexGrow: 0, flex: 'right', vertical: 'top', horizontal: 'right' }}>
                <Link to="register">
                  <Button color="neutral">Sign Up</Button>
                </Link>
                <Link to="login">
                  <Button color="neutral">Login</Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
