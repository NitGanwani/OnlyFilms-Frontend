import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { FilmRepository } from "../../core/services/film.repository";
import { useCallback, useMemo } from "react";
import { loadFilmsAsync } from "../redux/films.slice";

export function useFilms() {
  const { films } = useSelector((state: RootState) => state.films);

  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:7777/film";

  const repo: FilmRepository = useMemo(() => new FilmRepository(url), []);

  const handleLoadFilms = useCallback(async () => {
    await dispatch(loadFilmsAsync(repo));
  }, [repo, dispatch]);

  return {
    films,
    handleLoadFilms,
  };
}
