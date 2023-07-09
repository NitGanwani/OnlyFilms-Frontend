import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { FilmRepository } from "../../core/services/film.repository";
import { useCallback, useMemo } from "react";
import {
  ac,
  createFilmAsync,
  deleteFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from "../redux/films.slice";
import { Film } from "../models/film";

export function useFilms() {
  const { films, count, page } = useSelector((state: RootState) => state.films);
  const { token } = useSelector((state: RootState) => state.users);

  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:7777/film";

  const repo: FilmRepository = useMemo(
    () => new FilmRepository(url, token as string),
    [token]
  );

  const handleLoadFilms = useCallback(async () => {
    await dispatch(loadFilmsAsync(repo));
  }, [repo, dispatch]);

  const handleCreateFilm = async (film: FormData) => {
    dispatch(createFilmAsync({ repo, film }));
  };

  const handleUpdateFilm = async (id: Film["id"], film: FormData) => {
    await dispatch(updateFilmAsync({ repo, id, film }));
  };

  const handleDeleteFilm = async (id: Film["id"]) => {
    await dispatch(deleteFilmAsync({ repo, id }));
  };

  const handleNextPage = async () => {
    dispatch(ac.nextPage());
    await dispatch(loadFilmsAsync(repo));
  };

  const handlePreviousPage = async () => {
    dispatch(ac.previousPage());
    await dispatch(loadFilmsAsync(repo));
  };

  return {
    films,
    handleLoadFilms,
    handleCreateFilm,
    handleUpdateFilm,
    handleDeleteFilm,
    handleNextPage,
    handlePreviousPage,
    count,
    page,
  };
}
