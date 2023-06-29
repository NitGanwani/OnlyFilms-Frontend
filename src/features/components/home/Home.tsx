import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";

export default function Home() {
  const { handleLogoutUser } = useUsers();
  const navigate = useNavigate();

  const { token, currentUser } = useSelector((state: RootState) => state.users);

  const handleUser = () => {
    if (token) {
      runLogout();
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    console.log("Register");
    navigate("/register");
  };

  const runLogout = () => {
    handleLogoutUser();
  };

  return (
    <>
      <header>
        <h1>Sample Front</h1>
        <div>
          {token ? (
            <>
              <button onClick={handleUser}>Logout</button>
              <span>Hola, {currentUser.userName}</span>
            </>
          ) : (
            <>
              <button onClick={handleRegister}>Register</button>
              <button onClick={handleUser}>Login</button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
