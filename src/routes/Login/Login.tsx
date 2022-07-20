/*
import { useNavigate } from "react-router-dom";
import { post, get } from "../../api/axios";
export default function Login() {
  let navigate = useNavigate();

  async function handleSubmit(values: LoginValues) {
    const user = await post("/Account/authenticate", values);
    if (await get("/Account/isValid")) {
      localStorage.setItem("jwToken", user.jwToken);
      navigate("../");
    }
  }
  return <LoginForm onSubmit={handleSubmit} />;
}
*/
