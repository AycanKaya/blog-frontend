import axiosInstance from "../axios";
import User from "../model/user";

interface LoginDTO {
  email: string;
  password: string;
}

export default async function login(dto: LoginDTO): Promise<User> {
  const { data } = await axiosInstance.post<User>("/Account/authenticate", {
    email: dto.email,
    password: dto.password,
  });

  return data;
}
