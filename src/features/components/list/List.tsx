import { SyntheticEvent, useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";
import { FilmCard } from "../film/FilmCard";
import { useUsers } from "../../hooks/use.users";
import { useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { GiFilmProjector } from "react-icons/gi";
import { ImExit } from "react-icons/im";

export default function List() {
  const {
    films,
    handleLoadFilms,
    handlePaging,
    handleLoadFiltered,
    next,
    previous,
  } = useFilms();
  const { handleLogoutUser, token, currentUser } = useUsers();
  const navigate = useNavigate();

  const handleFilter = (event: SyntheticEvent) => {
    const element = event.target as HTMLButtonElement;
    if (element.name === "genre") {
      const filter = `genre=${element.value}`;
      handleLoadFiltered(filter);
    }
  };

  const handleLoadNext = () => {
    const url = next;
    if (!url) return;
    handlePaging(url);
  };

  const handleLoadPrevious = () => {
    const url = previous;
    if (!url) return;
    handlePaging(url);
  };

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
                  <button>YOUR FILMS </button>
                  <span>
                    <GiFilmProjector />
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
          ""
        )}
        <div className={style.films}>
          <ul>
            {films.map((item) => (
              <FilmCard key={item.id} item={item}></FilmCard>
            ))}
          </ul>
        </div>
        <div>
          {previous ? (
            <button onClick={handleLoadPrevious}>&#60;</button>
          ) : (
            <button onClick={handleLoadPrevious} disabled>
              &#60;
            </button>
          )}
        </div>
        {next ? (
          <button onClick={handleLoadNext}>&#62;</button>
        ) : (
          <button onClick={handleLoadNext} disabled>
            &#62;
          </button>
        )}
      </div>
      <section>
        <div>
          <button onClick={handleLoadFilms}>SHOW ALL</button>
          <button onClick={handleFilter} name="genre" value="Action">
            ACTION
          </button>
          <button onClick={handleFilter} name="genre" value="Sci-Fi">
            SCI-FI
          </button>
          <button onClick={handleFilter} name="genre" value="Comedy">
            COMEDY
          </button>
          <button onClick={handleFilter} name="genre" value="Horror">
            HORROR
          </button>
          <button onClick={handleFilter} name="genre" value="Animation">
            ANIMATION
          </button>
          <button onClick={handleFilter} name="genre" value="Drama">
            DRAMA
          </button>
        </div>
      </section>
    </>
  );
}
