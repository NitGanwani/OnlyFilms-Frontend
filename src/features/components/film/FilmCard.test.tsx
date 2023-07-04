import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { FilmCard } from "./FilmCard";
import { Film } from "../../models/film";

const mockFilm = {
  id: "1",
  title: "Memento",
  poster: {
    url: "memento.jpg",
  },
};
describe("Given Card component", () => {
  describe("When it is intantiate", () => {
    beforeEach(() => {
      render(
        <Router>
          <FilmCard item={mockFilm as Film}></FilmCard>
        </Router>
      );
    });

    test("Then it should be in the document", () => {
      const element = screen.getByRole("listitem");
      expect(element).toBeInTheDocument();
    });
  });
});
