import { useFilms } from "../../hooks/use.films";
import { SyntheticEvent, useEffect } from "react";
import { Header } from "../header/Header";
import style from "./Create.film.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../models/film";
import Swal from "sweetalert2";

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
      await handleUpdateFilm(id, filmData);
    } else {
      await handleCreateFilm(filmData);
      Swal.fire({
        width: "20em",
        icon: "success",
        title: "GREAT SUCCESS",
        text: "FILM ADDED SUCCESFULLY",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "green",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 2000,
      });
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
            <input type="text" id="title" name="title" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="release">Year of release: </label>
            <input type="text" id="release" name="release" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="genre">Select a genre: </label>
            <select name="genre" id="genre" required>
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
              required
            ></textarea>
          </div>
          {id ? (
            <p>Not possible to change the film poster</p>
          ) : (
            <div className={style.inputs}>
              <label htmlFor="poster">Poster: </label>
              <input
                type="file"
                id="poster"
                name="poster"
                accept=".png"
                required
              />
            </div>
          )}
          {id ? (
            <div className={style.submit}>
              <button type="submit">Save Changes</button>
            </div>
          ) : (
            <div className={style.submit}>
              <button type="submit">Add Film</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
