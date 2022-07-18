import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>
        <Link to="register">üye ol</Link>
      </div>
      <div>
        <Link to="login">giriş yap</Link>
      </div>
    </>
  );
}
