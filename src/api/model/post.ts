export default interface IPost {
  postId: number;
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  isApprove: boolean;
  isDeleted: boolean;
  isActive: boolean;
  authorID: string;
  createTime: Date;
  updateTime: Date;
}
