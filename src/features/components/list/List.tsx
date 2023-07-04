import { useEffect } from "react";
import { useFilms } from "../../hooks/use.films";
import { Header } from "../header/Header";
import style from "./List.module.scss";
import { FilmCard } from "../film/FilmCard";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../core/store/store";

export default function List() {
  const { films, handleLoadFilms } = useFilms();
  // const { currentUser, token } = useSelector((state: RootState) => state.users);

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
