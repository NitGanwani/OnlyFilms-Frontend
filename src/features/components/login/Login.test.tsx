import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import Login from "./Login";
import { store } from "../../../core/store/store";
import { useUsers } from "../../hooks/use.users";
import Swal from "sweetalert2";

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoginUser: jest.fn(),
    isError: null,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Given Login component", () => {
  describe("When the component is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
    });

    test("Then the 'Send' button should be in the form", async () => {
      const sendButton = screen.getByRole("button", { name: "Send" });
      expect(sendButton).toBeInTheDocument();
    });

    test("Then the handleLoginUser function should be called on form submit", async () => {
      const form = screen.getByRole("form");

      await fireEvent.submit(form);

      expect(useUsers().handleLoginUser).toHaveBeenCalled();
    });
  });
  describe("When the component is rendered having the isError value equal to false", () => {
    beforeEach(() => {
      useUsers().isError = false;

      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
    });

    test("Then the useNavigate function should be used", async () => {
      const form = screen.getByRole("form");

      await fireEvent.submit(form);

      expect(useNavigate()).toHaveBeenCalled();
    });
  });

  describe("When the component is rendered having the isError value equal to true", () => {
    beforeEach(() => {
      useUsers().isError = true;

      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
    });

    test("Then the useNavigate function should not be used", async () => {
      const form = screen.getByRole("form");

      await fireEvent.submit(form);

      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
