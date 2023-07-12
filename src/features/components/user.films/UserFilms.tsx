import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { useUsers } from "../../hooks/use.users";
import { Film } from "../../models/film";
import { FilmCard } from "../film/FilmCard";
import style from "./UserFilms.module.scss";
import { Header } from "../header/Header";
import { ComeBack } from "../come.back/ComeBack";

export default function UserFilms() {
  const { handleLoadFilms } = useFilms();
  const { userFilms, token } = useUsers();

  useEffect(() => {
    handleLoadFilms;
  }, [handleLoadFilms]);

  const films = userFilms as Film[];

  return (
    <>
      <Header title={"OnlyFilms"} subtitle={"Your Films"}></Header>
      <ComeBack></ComeBack>
      <ul className={style.list}>
        {token ? (
          films.map((film) => <FilmCard key={film.id} item={film}></FilmCard>)
        ) : (
          <p>Sorry, you haven't added any film yet</p>
        )}
      </ul>
    </>
  );
}
