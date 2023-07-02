import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { SyntheticEvent } from "react";
import { User } from "../../models/user";
import { Header } from "../header/Header";
import style from "./Login.module.scss";

export default function Login() {
  const { handleLoginUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const inputs = element.querySelectorAll("input");
    const loggedUser = {
      user: inputs[0].value,
      password: inputs[1].value,
    } as Partial<User>;
    handleLoginUser(loggedUser);
    element.reset();
    navigate("/list");
  };

  return (
    <>
      <Header title="OnlyFilms" subtitle="Login"></Header>
      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          <div className={style.inputs}>
            <label htmlFor="user">User</label>
            <input type="text" id="user" name="user" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={style.submit}>
            <button role="button" aria-selected="true" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
