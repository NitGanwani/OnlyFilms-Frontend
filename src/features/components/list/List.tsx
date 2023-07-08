import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";
import { FilmCard } from "../film/FilmCard";
import { useUsers } from "../../hooks/use.users";
import { useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { ImExit } from "react-icons/im";

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
      <div className={style.list}>
        <Header title="OnlyFilms" subtitle="Feel your Films"></Header>
        {token ? (
          <>
            <section className={style.greetings}>
              <p>Hi {currentUser}</p>
              <div className={style.userControls}>
                <div>
                  <button onClick={() => navigate("/create")}>
                    ADD A FILM{" "}
                  </button>
                  <span>
                    <PiFilmSlate />
                  </span>
                </div>
                <div>
                  <button onClick={handleUser}>LOG OUT </button>
                  <span>
                    <ImExit />
                  </span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p>Hola don Nadie</p>
        )}
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
