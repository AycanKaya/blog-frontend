export default interface Post {
  title: string;
  content: string;
  isActive: boolean;
  createdTime: Date;
  updatedTime: Date;
  authorID: string;
  id: number;
}
