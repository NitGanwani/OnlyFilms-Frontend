import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, useParams } from "react-router-dom";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
import { useFilms } from "../../hooks/use.films";
import CreateOrEditFilm from "./CreateOrEditFilm";
import userEvent from "@testing-library/user-event";
import { Image } from "../../types/image";
import { Comment } from "../../models/film";

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    handleCreateFilm: jest.fn(),
    handleUpdateFilm: jest.fn(),
    handleLoadFilms: jest.fn(),
    films: [],
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({}),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));
describe("Given the CreateOrEditFilm component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router initialEntries={["/create"]}>
          <CreateOrEditFilm></CreateOrEditFilm>
        </Router>
      </Provider>
    );
  });
  describe("When it is rendered", () => {
    test("Then it should have a form in the component", () => {
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });

    test("Then the handleCreateFilm function should be called", async () => {
      const button = screen.getByRole("button", { name: "Add Film" });
      const form = screen.getByRole("form");
      await userEvent.click(button);
      await fireEvent.submit(form);
      expect(useFilms().handleCreateFilm).toHaveBeenCalled();
    });
  });
});

describe("Given the CreateOrEditFilm component", () => {
  beforeEach(async () => {
    (useParams as jest.Mock).mockReturnValueOnce({ id: "1" });
    useFilms().films = [
      {
        id: "1",
        title: "Gafo",
        release: "2003",
        genre: "Drama",
        synopsis: "David's life",
        poster: { url: "", urlOriginal: "" } as unknown as Image,
        comments: [{}] as unknown as Comment[],
      },
    ];
    render(
      <Provider store={store}>
        <Router>
          <CreateOrEditFilm></CreateOrEditFilm>
        </Router>
      </Provider>
    );
  });
  describe("When it is rendered and has a valid id in the params", () => {
    test("Then the handleUpdateFilm function should be called", async () => {
      const form = screen.getByRole("form");
      const title = screen.getAllByRole("textbox");
      const button = screen.getByRole("button", { name: "Save Changes" });

      await userEvent.click(button);
      await fireEvent.submit(form);

      expect(title[0]).toHaveValue("Gafo");
      expect(useFilms().handleUpdateFilm).toHaveBeenCalled();
    });
  });
});

describe("When it is rendered with an id but there is no existing film", () => {
  (useParams as jest.Mock).mockReturnValueOnce({ id: "1" });
  useFilms().films = [];
  test("Then the handleLoadFilms function should be called", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateOrEditFilm></CreateOrEditFilm>
        </Router>
      </Provider>
    );
    expect(useFilms().handleLoadFilms).toHaveBeenCalled();
  });
});
