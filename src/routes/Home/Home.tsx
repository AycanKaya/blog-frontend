import Posts from "./Elements/Posts";
import HomeResponsiveBar from "./HomeResponsiveBar";
import "./style.css";
const Home = () => {
  return (
    <>
      <HomeResponsiveBar />
      <Posts />
    </>
  );
};
export default Home;
