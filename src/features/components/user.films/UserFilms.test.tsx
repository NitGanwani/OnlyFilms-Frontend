import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import UserFilms from "./UserFilms";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { Film } from "../../models/film";
import { useUsers } from "../../hooks/use.users";

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoadFilms: jest.fn(),
    token: undefined,
    userFilms: [
      { id: "1", title: "Dune", poster: { url: "Dune.jpg" } },
    ] as Film[],
  }),
}));

jest.mock("../../../config", () => ({
  url: "",
}));

describe("Given the UserFilms component", () => {
  describe("When it is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <UserFilms></UserFilms>
          </Router>
        </Provider>
      );
    });

    test("Then it should have a title in the document", () => {
      const noTokenText = screen.getByText(
        "Sorry, you haven't added any film yet"
      );
      expect(noTokenText).toBeInTheDocument();
    });
  });

  describe("When it is rendered", () => {
    beforeEach(() => {
      useUsers().token = "token";
      render(
        <Provider store={store}>
          <Router>
            <UserFilms></UserFilms>
          </Router>
        </Provider>
      );
    });

    test("Then it should have a film title in the document", () => {
      const title = screen.getByText("Dune");
      expect(title).toBeInTheDocument();
    });
  });
});
