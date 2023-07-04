import { Link } from "react-router-dom";
import { Film } from "../../models/film";

type PropsType = {
  item: Film;
};

export function FilmCard({ item }: PropsType) {
  return (
    <Link to={"/detail/" + item.id}>
      <li key={item.id}>
        <img src={item.poster.url} alt={item.title} width="150" height="250" />
        <span>{item.title}</span>
      </li>
    </Link>
  );
}
