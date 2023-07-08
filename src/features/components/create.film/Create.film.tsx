import { useFilms } from "../../hooks/use.films";
import { SyntheticEvent, useEffect } from "react";
import { Header } from "../header/Header";
import style from "./Create.film.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../models/film";

export default function CreateFilm() {
  const { handleCreateFilm, handleUpdateFilm, films, handleLoadFilms } =
    useFilms();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const existingFilm: Film = films.find((film) => film.id === id) as Film;
      if (!existingFilm) {
        handleLoadFilms();
      }
      if (existingFilm) {
        const form = document.querySelector(".form") as HTMLFormElement;
        (form.elements.namedItem("title") as HTMLInputElement).value =
          existingFilm.title;
        (form.elements.namedItem("release") as HTMLInputElement).value =
          existingFilm.release;
        (form.elements.namedItem("genre") as HTMLInputElement).value =
          existingFilm.genre;
        (form.elements.namedItem("synopsis") as HTMLInputElement).value =
          existingFilm.synopsis;
      }
    }
  }, [id, films, handleLoadFilms]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const filmForm = event.target as HTMLFormElement;
    const filmData = new FormData(filmForm);

    if (id) {
      console.log(id, "este id");
      await handleUpdateFilm(id, filmData);
      console.log(filmForm);
    } else {
      await handleCreateFilm(filmData);
    }

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
        <form onSubmit={handleSubmit} aria-label="form" className="form">
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
          {id ? (
            <p>Not possible to change the film poster</p>
          ) : (
            <div className={style.inputs}>
              <label htmlFor="poster">Poster: </label>
              <input type="file" id="poster" name="poster" accept=".png" />
            </div>
          )}

          <div className={style.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
