import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";
import { FilmCard } from "../film/FilmCard";
import { useUsers } from "../../hooks/use.users";
import { useNavigate } from "react-router-dom";

export default function List() {
  const { films, handleLoadFilms } = useFilms();
  const { handleLogoutUser, token, currentUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoadFilms();
  }, [handleLoadFilms]);

  const handleUser = () => {
    handleLogoutUser();
    navigate("/");
  };

  return (
    <>
      {token ? (
        <>
          <p>Hola {currentUser}</p>
          <button onClick={() => navigate("/create")}>CREATE NEW FILM</button>
          <button onClick={handleUser}>LOG OUT</button>
        </>
      ) : (
        <p>Hola don Nadie</p>
      )}
      <div className={style.list}>
        <Header title="OnlyFilms" subtitle="Feel your Films"></Header>
        <div className={style.films}>
          <ul>
            {films.map((item) => (
              <FilmCard key={item.id} item={item}></FilmCard>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
