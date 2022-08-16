export default interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  authorId: string;
  created: Date;
}
