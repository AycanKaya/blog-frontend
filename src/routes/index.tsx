import { Routes as BaseRoutes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import { Register } from "./Register";
import BlogPage from "./BlogPage";
import AdminPage from "./AdminPage";
import SettingsPage from "./AdminPage/SettingsPage.tsx";
import EditorPage from "./EditorPages";
import EditorSettingsPage from "./EditorPages/SettingsPage/Settings";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="blogPage" element={<BlogPage />} />
        <Route path="adminPage" element={<AdminPage />} />
        <Route path="adminInfo" element={<SettingsPage />} />
        <Route path="editorPostSettings" element={<EditorPage />} />
        <Route path="editorInfo" element={<EditorSettingsPage />} />
      </Route>
    </BaseRoutes>
  );
}
