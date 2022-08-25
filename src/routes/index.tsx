import { Routes as BaseRoutes, Route, Outlet } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { Register } from './Register';
import UserHomePage from './UserHome';
import ResponsiveAppBar from '../components/AppBar';
import UserSettings from './UserSettings';
import Dashboard from './Dashboard';
import Profile from './Profile';
import SettingPosts from './PostSettings';

export default function Routes() {
  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <>
            <ResponsiveAppBar />
            <Outlet />
          </>
        }>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userSettings" element={<UserSettings />} />
        <Route path="editorPostSettings" element={<SettingPosts />} />
        <Route path="sharePost" element={<Profile />} />
        <Route path="home" element={<UserHomePage />} />
      </Route>
    </BaseRoutes>
  );
}
