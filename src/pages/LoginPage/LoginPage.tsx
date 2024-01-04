import s from './LoginPage.module.sass'
import {Button} from "@/shared/ui/Button";
import {FormEvent, useEffect, useState} from "react";
import {PageNav} from "@/shared/ui/PageNav";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/features/AuthFake";

const LoginPage = () => {

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={s.login}>
      <PageNav/>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={s.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={'submit'} variant="primary">Login</Button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage