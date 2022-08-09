import AllPosts from "../../BlogPage/BlogForm/HomePage/AllPosts";
import Search from "../../Home/Elements/Search";
import ResponsiveAppBar from "../SetPostElements/EditorResponsiveBar";

const EditorHomePage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Search />
      <AllPosts />
    </>
  );
};
export default EditorHomePage;
