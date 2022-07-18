export default interface User {
  email: string;
  id: string;
  isVerified: boolean;
  jwToken: string;
  roles: string[];
  userName: string;
}
