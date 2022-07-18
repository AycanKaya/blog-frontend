export default function Register() {
  if (localStorage.getItem("jwToken")) {
    return <div>giriş yapmışssın</div>;
  }
  return <div>register</div>;
}
