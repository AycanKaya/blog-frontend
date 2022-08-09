import Posts from "./Elements/Posts";
import Search from "./Elements/Search";
import HomeResponsiveBar from "./HomeResponsiveBar";
import "./style.css";
const Home = () => {
  return (
    <>
      <HomeResponsiveBar />
      <Search />
      <Posts />
    </>
  );
};
export default Home;
