import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import FilmDetail from "./FilmDetail";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    films: [
      { id: "1", title: "Inception", poster: { url: "inception.jpg" } },
      { id: "2", title: "Interstellar", poster: { url: "interstellar.jpg" } },
    ],
  }),
}));

describe("Given a FilmDetail component", () => {
  describe("When it is intstantiate", () => {
    test("Show character details on the screen from context", () => {
      render(
        <Router initialEntries={["/detail/1"]}>
          <Provider store={store}>
            <FilmDetail />
          </Provider>
        </Router>
      );
      const filmDetails = screen.getByText("Inception");
      expect(filmDetails).toBeInTheDocument;
    });
  });
});
