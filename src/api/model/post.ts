export default interface IPost {
  postId: number;
  authorID: string;
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  isApprove: boolean;
  isDeleted: boolean;
  createTime: Date;
  updateTime: Date;
}
