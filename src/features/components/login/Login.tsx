import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { SyntheticEvent } from "react";
import { User } from "../../models/user";

export default function Login() {
  const { handleLoginUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const loggedUser = {
      user: (element.user as HTMLInputElement).value,
      password: (element.password as HTMLInputElement).value,
    } as Partial<User>;
    handleLoginUser(loggedUser as Partial<User>);
    console.log(loggedUser);
    element.reset();
    navigate("/list");
  };

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User / Email: </label>
          <input type="text" id="user" name="user" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
