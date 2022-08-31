export default interface IComment {
  id: number;
  postID: number;
  content: string;
  authorName: string;
  authorId: string;
  isDeleted: boolean;
  created: Date;
}
