import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { FilmRepository } from "../../core/services/film.repository";
import { useCallback, useMemo } from "react";
import {
  createFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from "../redux/films.slice";
import { Film } from "../models/film";

export function useFilms() {
  const { films } = useSelector((state: RootState) => state.films);
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

  return {
    films,
    handleLoadFilms,
    handleCreateFilm,
    handleUpdateFilm,
  };
}
