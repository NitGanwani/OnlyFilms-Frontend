import { useParams } from "react-router-dom";
import { useFilms } from "../../hooks/use.films";
import { Film } from "../../models/film";
import { Header } from "../header/Header";

export default function FilmDetail() {
  const { id } = useParams();
  const { films } = useFilms();

  const item: Film = films.find((item) => item.id === id) as Film;

  return (
    <>
      <Header title="OnlyFilms" subtitle="Film Details"></Header>
      <ul>
        <li>{item.title}</li>
        <li>
          <img src={item.poster.url} alt={item.title} />
        </li>
      </ul>
    </>
  );
}
