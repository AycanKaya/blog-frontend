import ResponsiveAppBar from "../Elements/BasicUserResponsiveBar";
import PostSharing from "./Elements/SharePosts";
import UserPosts from "../WaitingAndCancelledPosts/UserPosts";

const SharePost = () => {
  return (
    <>
      <ResponsiveAppBar />
      <PostSharing />
      <UserPosts />
    </>
  );
};
export default SharePost;
