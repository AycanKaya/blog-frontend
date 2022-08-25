import IComment from "./comment";
import IPost from "./post";

export default interface IPostComments {
  post: IPost;
  comments: IComment[];
}
