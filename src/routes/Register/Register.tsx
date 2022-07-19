import register from "../../api/service/register";
import RegisterForm from "./RegisterForm";
import { RegisterValues } from "./RegisterForm/RegisterForm";

export default function Register() {
  if (localStorage.getItem("jwToken")) {
    return <div>giriş yapmışssın</div>;
  }

  async function handleSubmit(values: RegisterValues) {
    const user = await register(values);
  }

  return <RegisterForm onSubmit={handleSubmit} />;
}
