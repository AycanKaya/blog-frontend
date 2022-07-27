import * as React from "react";
import ResponsiveAppBar from "./AdminResponsiveBar";
import AgGrid from "../AdminPage/AgGrid";
const AdminPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <AgGrid />
    </>
  );
};
export default AdminPage;
