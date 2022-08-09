import Search from "../../../Home/Elements/Search";
import ResponsiveAppBar from "../Elements/BasicUserResponsiveBar";
import AllPosts from "./AllPosts";

const UserHomePage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Search />
      <AllPosts />
    </>
  );
};
export default UserHomePage;
