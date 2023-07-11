import { act, render, screen } from "@testing-library/react";
// import { FilmRepository } from "../../core/services/film.repository";
import { useFilms } from "./use.films";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";

jest.mock("../../config", () => ({
  url: "",
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockId = "1";

const mockFilm = {
  id: "1",
  title: "Raquelinator",
  release: "2023",
} as unknown as FormData;

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
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test("Then the handleLoadFilms function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test("Then the handleUpdateFilm function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test("Then the handleDeleteFilm function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[3]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test("Then the handlePaging function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[4]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test("Then the handleLoadFiltered function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[5]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });
  });
});
