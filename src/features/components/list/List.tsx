import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";
import { FilmCard } from "../film/FilmCard";

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
            <FilmCard key={item.id} item={item}></FilmCard>
          ))}
        </ul>
      </div>
    </>
  );
}
