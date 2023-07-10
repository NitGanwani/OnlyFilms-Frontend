import { act, render, screen } from "@testing-library/react";
import { FilmRepository } from "../../core/services/film.repository";
import { useFilms } from "./use.films";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";
import {
  createFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from "../redux/films.slice";
import { ApiAnswer, GetFilmPayload } from "../types/api.response";

jest.mock("../../config", () => ({
  url: "",
}));

const mockId = "1";

const mockFilm = {
  id: "1",
  title: "Raquelinator",
  release: "2023",
} as unknown as FormData;

const mockApiAnswer = {
  items: [{ title: "Taxi Driver", genre: "Action" }],
  next: null,
  previous: null,
  count: 0,
} as unknown as ApiAnswer;

const mockRepo = {
  getAll: jest.fn().mockResolvedValue(mockApiAnswer),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as FilmRepository;

const mockPayload = {
  repo: mockRepo,
  url: "http://onlyfilms.com/",
} as unknown as GetFilmPayload;

const mockUrl = "http://test.com";

const mockGenre = "Comedy";

function TestComponent() {
  const {
    handleLoadFilms,
    handleCreateFilm,
    handleUpdateFilm,
    handleDeleteFilm,
    handlePaging,
    handleLoadFiltered,
  } = useFilms();

  return (
    <>
      <button onClick={() => handleCreateFilm(mockFilm)}></button>
      <button onClick={() => handleLoadFilms()}></button>
      <button onClick={() => handleUpdateFilm(mockId, mockFilm)}></button>
      <button onClick={() => handleDeleteFilm(mockId)}></button>
      <button onClick={() => handlePaging(mockUrl)}></button>
      <button onClick={() => handleLoadFiltered(mockGenre)}></button>
    </>
  );
}

describe("Given the useUsers custom hook", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <Router>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      )
    );
    elements = screen.getAllByRole("button");
  });
  describe("When is rendered", () => {
    test("Then the handleCreateFilm function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        store.dispatch(createFilmAsync({ repo: mockRepo, film: mockFilm }));
        expect(mockRepo.create).toHaveBeenCalled();
      });
    });

    test("Then the handleLoadFilms function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        store.dispatch(loadFilmsAsync(mockPayload));
        expect(mockRepo.getAll).toHaveBeenCalled();
      });
    });

    test("Then the handleUpdateFilm function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(
          updateFilmAsync({ repo: mockRepo, id: mockId, film: mockFilm })
        );
        expect(mockRepo.update).toHaveBeenCalledWith(mockId, mockFilm);
      });
    });

    // test("Then the handleDeleteFilm function should be called", async () => {
    //   await act(async () => {
    //     await userEvent.click(elements[3]);
    //     store.dispatch(deleteFilmAsync({ repo: mockRepo, id: mockId }));
    //     expect(mockRepo.delete).toHaveBeenCalled();
    //   });
    // });

    test("Then the handlePaging function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[4]);
        store.dispatch(loadFilmsAsync(mockPayload));
        expect(mockRepo.getAll).toHaveBeenCalled();
      });
    });

    test("Then the handleLoadFiltered function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[5]);
        store.dispatch(loadFilmsAsync(mockPayload));
        expect(mockRepo.getAll).toHaveBeenCalled();
      });
    });
  });
});
