import { Header } from "../header/Header";
import style from "./List.module.scss";

export default function List() {
  return (
    <>
      <div className={style.list}>
        <Header title="OnlyFilms" subtitle="Feel your Films"></Header>
        <span>Aquí está la lista de pelis</span>
      </div>
    </>
  );
}
