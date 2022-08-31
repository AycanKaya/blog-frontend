export default interface IPost {
  postId: number;
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  isApprove: boolean;
  isDeleted: boolean;
  createTime: Date;
  updateTime: Date;
}
