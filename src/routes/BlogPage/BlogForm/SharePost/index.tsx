import ResponsiveAppBar from "../Elements/BasicUserResponsiveBar";
import PostSharing from "./Elements/SharePosts";
import UserPosts from "./Elements/UserPosts";

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
