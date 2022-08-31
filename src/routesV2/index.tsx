import { Routes as BaseRoutes, Route, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Home from './Home';

function BlogAppbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default function Routes() {
  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <>
            <BlogAppbar />
            <Outlet />
          </>
        }>
        <Route index element={<Home />} />
      </Route>
    </BaseRoutes>
  );
}
