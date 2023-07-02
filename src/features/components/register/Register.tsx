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
    } as unknown as Partial<User>;

    if (data.userName === "" || data.email === "" || data.password === "") {
      Swal.fire({
        background: "black",
        imageUrl: "/clay.gif",
        imageHeight: "300px",
        title: "",
      });
      navigate("/register");
    } else {
      handleRegisterUser(data);
      formElement.reset();
      navigate("/login");
    }
  };

  return (
    <>
      <Header title="OnlyFilms" subtitle="Get Registered"></Header>

      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          <div className={style.inputs}>
            <label htmlFor="user">User Name: </label>
            <input type="text" id="user" name="user" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" />
          </div>
          <div className={style.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
