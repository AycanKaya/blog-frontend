import LoginForm from "../../routes/Login/LoginForm/LoginForm";
import RegisterForm from "../../routes/Register/RegisterForm/RegisterForm";
import { LoginValues } from "../../routes/Login/LoginForm/LoginForm";
import { RegisterValues } from "../../routes/Register/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { post, get } from "../../api/axios";

export default function Login() {
  let navigate = useNavigate();

  async function handleSubmit(values: LoginValues) {
    const data = await post("/Account/authenticate", values);

    localStorage.setItem("jwToken", data.user.jwToken);
    const response = await get("/Account/GetCurrentUserRole");
    if (response.role === "Admin") {
      navigate("../adminInfo");
    } else if (response.role == "Editor") {
      navigate("../editorInfo");
    } else navigate("../blogPage");
  }
  return <LoginForm onSubmit={handleSubmit} />;
}

export function Register() {
  let navigate = useNavigate();
  if (localStorage.getItem("jwToken")) {
    return <div>giriş yapmışssın</div>;
  }

  async function handleSubmit(values: RegisterValues) {
    const response = await post("/Account/register", values);
    if (response) {
      navigate("../login");
    }
  }

  return <RegisterForm onSubmit={handleSubmit} />;
}
