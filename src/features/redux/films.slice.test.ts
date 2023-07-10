import { FilmRepository } from "../../core/services/film.repository";
import { store } from "../../core/store/store";
import { Film } from "../models/film";
import { ApiAnswer } from "../types/api.response";
import {
  createFilmAsync,
  // loadFilmsAsync,
  updateFilmAsync,
} from "./films.slice";

describe("Given the films slice reducer", () => {
  describe("When it is instantiated", () => {
    const film = { id: "7", title: "Goodfellas" } as Partial<Film>;
    const filmFormData = {} as unknown as FormData;
    const filmData = { items: [{ title: "Scarface" }] } as ApiAnswer;
    const repo = {
      getAll: jest.fn().mockResolvedValueOnce(filmData),
      create: jest.fn(),
      delete: jest.fn(),
      udpdate: jest.fn(),
    } as unknown as FilmRepository;

    // test("Then it should dispatch the loadFilmsAsync", () => {
    //   store.dispatch(loadFilmsAsync(repo));
    //   expect(repo.getAll).toHaveBeenCalled();
    // });

    test("Then it should dispatch the createFilmAsync", () => {
      store.dispatch(createFilmAsync({ repo, film: filmFormData }));
      expect(repo.create).toHaveBeenCalled();
    });

    test("Then it should dispatch the updateFilmAsync", () => {
      store.dispatch(
        updateFilmAsync({ repo, id: film.id as string, film: filmFormData })
      );
      expect(repo.udpdate).toHaveBeenCalled();
    });
  });
});
