import { Link } from "react-router-dom";
import { Header } from "../header/Header";

export default function Home() {
  // const { handleLogoutUser } = useUsers();
  // const navigate = useNavigate();

  // const { token } = useSelector((state: RootState) => state.users);

  // const handleUser = () => {
  //   if (token) {
  //     runLogout();
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // const handleRegister = () => {
  //   navigate("/register");
  // };

  // const handleFilmsList = () => {
  //   navigate("/list");
  // };

  // const runLogout = () => {
  //   handleLogoutUser();
  // };

  return (
    <>
      <Header title="OnlyFilms" subtitle="Feel your films"></Header>
      <div>
        <Link to="/list">
          <button>Films</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}
