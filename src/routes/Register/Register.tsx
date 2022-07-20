import { register } from "../../api/service/UserService";
import RegisterForm from "./RegisterForm";
import { RegisterValues } from "./RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  if (localStorage.getItem("jwToken")) {
    return <div>giriş yapmışssın</div>;
  }

  async function handleSubmit(values: RegisterValues) {
    const response = await register(values);
    console.log(navigate);
    if (response) {
      console.log(navigate);
      navigate("../login");
    }
  }

  return <RegisterForm onSubmit={handleSubmit} />;
}
