import { Routes as BaseRoutes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import { Register } from "./Register";
import BlogPage from "./BlogPage";
import AdminPage from "./AdminPage";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="blogPage" element={<BlogPage />} />
        <Route path="adminPage" element={<AdminPage />} />
      </Route>
    </BaseRoutes>
  );
}
