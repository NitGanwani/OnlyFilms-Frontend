import { act, render, screen } from "@testing-library/react";
import { FilmRepository } from "../../core/services/film.repository";
import { useFilms } from "./use.films";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";
import { createFilmAsync, loadFilmsAsync } from "../redux/films.slice";

const mockId = "1";
const mockFilm = {
  title: "Raquelinator",
  release: "2023",
} as unknown as FormData;
const mockRepo = {
  getAll: jest.fn(),
  create: jest.fn(),
} as unknown as FilmRepository;

function TestComponent() {
  const { handleLoadFilms, handleCreateFilm, handleUpdateFilm } = useFilms();

  return (
    <>
      <button onClick={() => handleCreateFilm(mockFilm)}></button>
      <button onClick={() => handleLoadFilms()}></button>
      <button onClick={() => handleUpdateFilm(mockId, mockFilm)}></button>
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
        store.dispatch(loadFilmsAsync(mockRepo));
        expect(mockRepo.getAll).toHaveBeenCalled();
      });
    });

    // test("Then the handleUpdateFilm should be called", async () => {
    //   await act(async () => {
    //     await userEvent.click(elements[2]);
    //     store.dispatch(
    //       updateFilmAsync({ repo: mockRepo, id: mockId, film: mockFilm })
    //     );
    //     expect(mockRepo.udpdate).toHaveBeenCalled();
    //   });
    // });
  });
});
