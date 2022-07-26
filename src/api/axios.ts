import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44371/api",
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

function getHeaders() {
  var myToken = "Bearer " + localStorage.getItem("jwToken");
  const headers = {
    Authorization: myToken,
  };
  return headers;
}

export async function post(url: string, body?: any) {
  var headers = getHeaders();
  const { data } = await axiosInstance.post(url, body, { headers });
  return data;
}

export async function get(url: string, body?: string) {
  var headers = getHeaders();
  const { data } = await axiosInstance.get(url, { headers });
  return data;
}

export async function put(url: string, body?: string) {
  var headers = getHeaders();
  const { data } = await axiosInstance.put(url, body, { headers });
  return data;
}
export default axiosInstance;
