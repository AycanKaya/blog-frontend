import axiosInstance from "../axios";
import User from "../model/user";

interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export default async function register(dto: RegisterDTO): Promise<User> {
  const { data } = await axiosInstance.post<User>("/Account/register", {
    email: dto.email,
    username: dto.username,
    password: dto.password,
  });

  return data;
}
