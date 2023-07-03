import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";

export default function List() {
  const { films, handleLoadFilms } = useFilms();

  useEffect(() => {
    handleLoadFilms();
  }, [handleLoadFilms]);

  return (
    <>
      <div className={style.list}>
        <Header title="OnlyFilms" subtitle="Feel your Films"></Header>
        <ul>
          {films.map((item) => (
            <li key={item.id}>
              {item.title}
              <img src={item.poster.url} alt="" height="250" width="250" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
