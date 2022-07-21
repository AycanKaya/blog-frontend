import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { post, get } from "../axios";
import Post from "../model/post";

interface PostDTO {
  title: string;
  content: string;
}
