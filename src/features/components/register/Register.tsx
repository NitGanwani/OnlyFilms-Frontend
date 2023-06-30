import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { User } from "../../models/user";
import { useNavigate } from "react-router-dom";

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
    handleRegisterUser(data);
    formElement.reset();
    navigate("/login");
  };

  return (
    <>
      <h2>Get registered</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User Name: </label>
          <input type="text" id="user" name="user" required />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
