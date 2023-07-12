import { FilmRepository } from "../../core/services/film.repository";
import { store } from "../../core/store/store";
import { Film } from "../models/film";
import { ApiAnswer, GetFilmPayload } from "../types/api.response";
import {
  createFilmAsync,
  deleteFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from "./films.slice";

describe("Given the users slice reducer", () => {
  describe("When it is instantiated", () => {
    const mockFilm = {
      id: "1",
      title: "El precio del poder",
    } as unknown as FormData;
    const mockUpdatedFilm = {
      id: "1",
      title: "Scarface",
    } as unknown as FormData;
    const mockId = "1" as Film["id"];
    const mockApiAnswer = {
      items: [{ id: "1", title: "Taxi Driver", genre: "Action" }],
      next: null,
      previous: null,
      count: 0,
    } as unknown as ApiAnswer;

    const mockRepo: FilmRepository = {
      getAll: jest.fn().mockResolvedValue(mockApiAnswer),
      create: jest.fn().mockResolvedValue(mockFilm),
      update: jest.fn().mockResolvedValue(mockUpdatedFilm),
      delete: jest.fn().mockResolvedValue(true),
    } as unknown as FilmRepository;

    const mockPayload = {
      repo: mockRepo,
      url: "http://onlyfilms.com/",
    } as unknown as GetFilmPayload;

    test("Then it should dispatch the loadFilmsAsync", () => {
      store.dispatch(loadFilmsAsync(mockPayload));
      expect(mockRepo.getAll).toHaveBeenCalled();
    });

    test("Then it should dispatch the createFilmAsync", () => {
      store.dispatch(createFilmAsync({ repo: mockRepo, film: mockFilm }));
      expect(mockRepo.create).toHaveBeenCalled();
    });

    test("Then it should dispatch the updateFilmAsync", () => {
      store.dispatch(
        updateFilmAsync({ repo: mockRepo, id: mockId, film: mockUpdatedFilm })
      );
      expect(mockRepo.update).toHaveBeenCalled();
    });

    test("Then it should dispatch the deleteFilmAsync", () => {
      store.dispatch(deleteFilmAsync({ repo: mockRepo, id: mockId }));
      expect(mockRepo.delete).toHaveBeenCalled();
    });

    test("Then it should dispatch the deleteFilmAsync", () => {
      mockRepo.delete = jest.fn().mockResolvedValue(false);
      store.dispatch(deleteFilmAsync({ repo: mockRepo, id: "69" }));
      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});
