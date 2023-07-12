import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import List from "./List";
import "@testing-library/jest-dom";
import { useUsers } from "../../hooks/use.users";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    handleLoadFilms: jest.fn(),
    films: [{ id: "1", title: "Memento", poster: { url: "memento.jpg" } }],
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLogoutUser: jest.fn(),
    token: "",
  }),
}));

describe("Given the List component", () => {
  describe("When it is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <List></List>
          </Router>
        </Provider>
      );
    });
    test("Then it should have a header component in the document", () => {
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });

    describe("When the component is rendered having a valid token", () => {
      beforeEach(() => {
        useUsers().token = "token";
        render(
          <Provider store={store}>
            <Router>
              <List></List>
            </Router>
          </Provider>
        );
      });

      test("Then the handleLogoutUser function should be called", async () => {
        const logOutButton = screen.getByRole("button", { name: "LOG OUT" });
        await userEvent.click(logOutButton);
        expect(useUsers().handleLogoutUser).toHaveBeenCalled();
      });
    });
    test("Then it should navigate to /create when ADD A FILM button is clicked", async () => {
      const addButton = screen.getByRole("button", { name: "ADD A FILM" });
      await userEvent.click(addButton);
      expect(useNavigate()).toHaveBeenCalled();
    });

    test("Then it should navigate to /myfilms when YOUR FILMS button is clicked", async () => {
      const addButton = screen.getByRole("button", { name: "YOUR FILMS" });
      await userEvent.click(addButton);
      expect(useNavigate()).toHaveBeenCalled();
    });
  });
});
