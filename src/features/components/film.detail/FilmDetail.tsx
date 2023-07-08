import { useParams } from "react-router-dom";
import { useFilms } from "../../hooks/use.films";
import { Film } from "../../models/film";
import { Header } from "../header/Header";
import style from "./FilmDetail.module.scss";

export default function FilmDetail() {
  const { id } = useParams();
  const { films } = useFilms();

  const item: Film = films.find((item) => item.id === id) as Film;

  return (
    <>
      <Header title="OnlyFilms" subtitle="Film Details"></Header>
      <div className={style.details}>
        <img src={item.poster.url} alt={item.title} />
        <ul>
          <li className={style.title}>
            {item.title} <span>({item.genre})</span>
          </li>
          <li>Released in {item.release}</li>
          <li className={style.description}>{item.synopsis}</li>
        </ul>
      </div>
    </>
  );
}
