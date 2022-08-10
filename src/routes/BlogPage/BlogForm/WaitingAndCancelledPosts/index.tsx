import ResponsiveAppBar from "../Elements/BasicUserResponsiveBar";
import SharePosts from "../SharePost/Elements/SharePosts";
import AllPosts from "./AllPosts";

const WaitingAndCancelledPosts = () => {
  return (
    <>
      <ResponsiveAppBar />
      <SharePosts />
      <AllPosts />
    </>
  );
};
export default WaitingAndCancelledPosts;
