import { useFilms } from "../../hooks/use.films";
import { SyntheticEvent } from "react";
import { Header } from "../header/Header";
import style from "./Create.film.module.scss";
import { useNavigate } from "react-router-dom";

export default function CreateFilm() {
  const { handleCreateFilm } = useFilms();
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const filmForm = event.target as HTMLFormElement;
    const filmData = new FormData(filmForm);
    handleCreateFilm(filmData);
    navigate("/list");
    // try {

    //   if (response.ok) {
    //     handleCreateFilm(filmData);
    //     filmForm.reset();
    //     navigate("/list");
    //   } else {
    //     console.log(state);
    //     console.log("Error al añadir pelicula");
    //   }
    // } catch (error) {
    //   console.log("ERROR GRANDIOSO");
    // }
  };

  return (
    <>
      <Header title="OnlyFilms" subtitle="Create Film"></Header>

      <div className={style.form}>
        <form onSubmit={handleSubmit} aria-label="form">
          <div className={style.inputs}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="release">Year of release: </label>
            <input type="text" id="release" name="release" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="genre">Select a genre: </label>
            <select name="genre" id="genre">
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Animation">Animation</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
          <div className={style.inputs}>
            <label htmlFor="synopsis">Synopsis: </label>
            <textarea
              name="synopsis"
              id="synopsis"
              cols={100}
              rows={5}
            ></textarea>
          </div>
          <div className={style.inputs}>
            <label htmlFor="poster">Poster: </label>
            <input type="file" id="poster" name="poster" accept=".png" />
          </div>
          <div className={style.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
