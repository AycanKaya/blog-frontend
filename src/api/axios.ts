import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44371/api",
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export async function post(url: string, body: string) {
  var myToken = "Bearer " + localStorage.getItem("jwToken");
  const headers = {
    Authorization: myToken,
  };
  const { data } = await axiosInstance.post(url, body, { headers });
  return data;
}

export async function getAll(url: string): Promise<any> {
  var myToken = "Bearer " + localStorage.getItem("jwToken");
  const headers = {
    Authorization: myToken,
  };
  const { data } = await axiosInstance.post<any>(url, { headers });
  return data;
}

export default axiosInstance;
