import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { FilmRepository } from "../../core/services/film.repository";
import { useCallback, useMemo } from "react";
import {
  createFilmAsync,
  deleteFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from "../redux/films.slice";
import { Film } from "../models/film";
import { url } from "../../config";

export function useFilms() {
  const { films, next, previous } = useSelector(
    (state: RootState) => state.films
  );
  const { token } = useSelector((state: RootState) => state.users);

  const dispatch: AppDispatch = useDispatch();

  const repo: FilmRepository = useMemo(
    () => new FilmRepository(url, token as string),
    [token]
  );

  const handleLoadFilms = useCallback(async () => {
    await dispatch(loadFilmsAsync({ repo, url: url + "film" }));
  }, [repo, dispatch]);

  const handleCreateFilm = async (film: FormData) => {
    await dispatch(createFilmAsync({ repo, film }));
  };

  const handleUpdateFilm = async (id: Film["id"], film: FormData) => {
    await dispatch(updateFilmAsync({ repo, id, film }));
  };

  const handleDeleteFilm = async (id: Film["id"]) => {
    await dispatch(deleteFilmAsync({ repo, id }));
  };

  const handlePaging = async (url: string) => {
    await dispatch(loadFilmsAsync({ repo, url }));
  };

  const handleLoadFiltered = async (genre: string) => {
    await dispatch(loadFilmsAsync({ repo, url, genre }));
  };

  return {
    films,
    handleLoadFilms,
    handleCreateFilm,
    handleUpdateFilm,
    handleDeleteFilm,
    handlePaging,
    handleLoadFiltered,
    next,
    previous,
  };
}
