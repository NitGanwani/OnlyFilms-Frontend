import { Link } from "react-router-dom";
import { Film } from "../../models/film";

type PropsType = {
  item: Film;
};

export function FilmCard({ item }: PropsType) {
  return (
    <li key={item.id}>
      <Link to={"/detail/" + item.id}>
        <img src={item.poster.url} alt={item.title} width="150" height="250" />
        <span>{item.title}</span>
      </Link>
    </li>
  );
}
