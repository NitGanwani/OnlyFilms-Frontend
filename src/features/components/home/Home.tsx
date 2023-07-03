import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import style from "./Home.module.scss";

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
      <div className={style.welcome}>
        <p className={style.intro}>
          Welcome to a unique place where you can express your feelings about
          the films you have watched, and share them with the whole world.
          Remember that the only condition to express your emotions is by using
          a single unique sentence.
        </p>
        <div className={style.films}>
          <p>
            Feeling shy about sharing your emotions? Don't worry, feel free to
            take a look to our list of <a href="/list">films</a>.
          </p>
        </div>
        <div className={style.register}>
          <p>
            If you are ready to share your feelings,{" "}
            <a href="/register">create your account here</a> and get started.
          </p>
        </div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}
