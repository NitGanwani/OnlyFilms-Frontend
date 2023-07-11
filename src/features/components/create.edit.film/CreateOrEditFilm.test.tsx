import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import CreateFilm from "./CreateOrEditFilm";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
import { useFilms } from "../../hooks/use.films";

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    handleCreateFilm: jest.fn(),
  }),
}));

describe("Given the CreateFilm component", () => {
  describe("When it is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <CreateFilm></CreateFilm>
          </Router>
        </Provider>
      );
    });
    test("Then it should have a Sing Up button in the form", () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("Then the handleCreateFilm function should be called", async () => {
      const form = screen.getByRole("form");
      await fireEvent.submit(form);
      expect(useFilms().handleCreateFilm).toHaveBeenCalled();
    });
  });
});
