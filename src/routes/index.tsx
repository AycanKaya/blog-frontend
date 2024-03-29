import { Routes as BaseRoutes, Route, Outlet } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { Register } from './Register';
import ResponsiveAppBar from '../components/AppBar';
import Dashboard from './Dashboard';
import SettingPosts from './PostSettings';
import SharePost from './SharePost';
import Post from './Post/Post';
import HomeUser from './HomeUser';
import UserSettings from './UserSettings/UserSettings';

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
        <Route path="editorPostSettings" element={<SettingPosts />} />
        <Route path="sharePost" element={<SharePost />} />
        <Route path="home" element={<HomeUser />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="user/:userID" element={<UserSettings />} />
      </Route>
    </BaseRoutes>
  );
}
