import axios from "axios";
import axiosInstance from "../axios";
import User from "../model/user";

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export default async function login(dto: LoginDTO): Promise<User> {
  const { data } = await axiosInstance.post<User>("/Account/authenticate", {
    email: dto.email,
    password: dto.password,
  });

  return data;
}
export async function register(dto: RegisterDTO): Promise<User> {
  const { data } = await axiosInstance.post<User>("/Account/register", {
    email: dto.email,
    username: dto.username,
    password: dto.password,
  });

  return data;
}

/* 
var url = "/User/PostUser";
var body = {};
post(url, body)

function post(url ,body) {
  Header a Authorization key i için Token ekleyeceksin

}

*/
export async function post(url: string, body: string) {
  var myToken = "Bearer " + localStorage.getItem("jwToken");
  const headers = {
    Authorization: myToken,
  };
  const { data } = await axiosInstance.post(url, body, { headers });
  return data;
}
