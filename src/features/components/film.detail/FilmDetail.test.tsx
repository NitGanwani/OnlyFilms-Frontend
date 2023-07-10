import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import FilmDetail from "./FilmDetail";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useFilms } from "../../hooks/use.films";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    films: [
      { id: "1", title: "Inception", poster: { url: "inception.jpg" } },
      { id: "2", title: "Interstellar", poster: { url: "interstellar.jpg" } },
    ],
    handleDeleteFilm: jest.fn(),
  }),
}));

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    token: "testtoken",
  }),
}));

jest.mock("../../../config", () => ({
  url: "",
}));

describe("Given a FilmDetail component", () => {
  describe("When the component is rendered", () => {
    beforeEach(() => {
      render(
        <Router initialEntries={["/detail/1"]}>
          <Provider store={store}>
            <FilmDetail />
          </Provider>
        </Router>
      );
    });
    test("Then it should show film details on the screen", () => {
      const filmDetails = screen.getByText("Inception");
      expect(filmDetails).toBeInTheDocument();
    });

    test("Then the handleDeleteFilm should be called when DELETE button is clicked", async () => {
      const deleteButton = screen.getAllByRole("button");
      await userEvent.click(deleteButton[1]);
      expect(useFilms().handleDeleteFilm).toHaveBeenCalled();
    });

    test("Then it should navigate to /update when EDIT button is clicked", async () => {
      const editButton = screen.getAllByRole("button");
      await userEvent.click(editButton[0]);
      expect(useNavigate()).toHaveBeenCalled();
    });
  });
});
