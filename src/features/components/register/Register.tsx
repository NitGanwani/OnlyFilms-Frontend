import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { User } from "../../models/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./Register.module.scss";
import { Header } from "../header/Header";

export default function Register() {
  const { handleRegisterUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      userName: (formElement.elements.namedItem("user") as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (formElement.elements.namedItem("password") as HTMLInputElement)
        .value,
    } as Partial<User>;

    if (data.userName === "" || data.email === "" || data.password === "") {
      Swal.fire({
        width: "20em",
        icon: "error",
        title: "REGISTER ERROR",
        text: "Try again please",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "red",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 2000,
      });
    } else {
      handleRegisterUser(data);
      Swal.fire({
        width: "20em",
        icon: "success",
        title: "WELCOME TO ONLYFILMS",
        text: "Redirecting to login process",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "green",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 2000,
      });
      formElement.reset();
      navigate("/login");
    }
  };

  return (
    <>
      <Header title="OnlyFilms" subtitle="Get Registered"></Header>

      <div className={style.form}>
        <form onSubmit={handleSubmit} aria-label="form">
          <div className={style.inputs}>
            <label htmlFor="user">User Name: </label>
            <input type="text" id="user" name="user" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" role="textbox" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              data-testid="password"
              role="textbox"
            />
          </div>
          <div className={style.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
