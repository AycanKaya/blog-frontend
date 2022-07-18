import login from "../../api/service/login";
import LoginForm from "./LoginForm";
import { LoginValues } from "./LoginForm/LoginForm";

export default function Login() {
  async function handleSubmit(values: LoginValues) {
    const user = await login(values);
    localStorage.setItem("jwToken", user.jwToken);
  }

  return <LoginForm onSubmit={handleSubmit} />;
}
