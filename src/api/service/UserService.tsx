import LoginForm from '../../routes/Login/LoginForm/LoginForm';
import RegisterForm from '../../routes/Register/RegisterForm/RegisterForm';
import { LoginValues } from '../../routes/Login/LoginForm/LoginForm';
import { RegisterValues } from '../../routes/Register/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { post, get } from '../../api/axios';

export default function Login() {
  let navigate = useNavigate();

  async function handleSubmit(values: LoginValues) {
    const data = await post('/Account/authenticate', values);

    localStorage.setItem('jwToken', data.user.jwToken);
    localStorage.setItem('id', data.user.id);
    localStorage.setItem('userRole', data.user.roles[0]);

    navigate('../home');
  }
  return <LoginForm onSubmit={handleSubmit} />;
}

export function Register() {
  let navigate = useNavigate();
  if (localStorage.getItem('jwToken')) {
    navigate('../home');
  }

  async function handleSubmit(values: RegisterValues) {
    const response = await post('/Account/register', values);
    if (response.succeeded) {
      navigate('../login');
    }
  }

  return <RegisterForm onSubmit={handleSubmit} />;
}
