import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import List from "../list/List";

export default function Home() {
  const { token } = useUsers();

  return (
    <>
      {token ? (
        <List></List>
      ) : (
        <>
          <div>
            <Link to={"/register"}>Sign Up</Link>
          </div>
          <div>
            <Link to={"/login"}>Log In</Link>
          </div>
        </>
      )}
    </>
  );
}
