import { MemoryRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Register from "./Register";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { useUsers } from "../../hooks/use.users";
import Swal from "sweetalert2";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleRegisterUser: jest.fn(),
  }),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Given the Register component", () => {
  describe("When register form is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Register />
          </Router>
        </Provider>
      );
    });

    test("Then the Sign Up button should be in the document", () => {
      const signUpButton = screen.getByRole("button");
      expect(signUpButton).toBeInTheDocument();
    });

    test("Then the handleRegisterUser should be called on form submit", async () => {
      const form = screen.getByRole("form");
      const button = screen.getByRole("button");
      const inputs = screen.getAllByRole("textbox");
      await userEvent.type(inputs[0], "Nitin");
      await userEvent.type(inputs[1], "nitin@mail.com");
      await userEvent.type(inputs[2], "12345");
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(useUsers().handleRegisterUser).toHaveBeenCalled();
    });

    test("Then the handleRegisterUser should be called on form submit", async () => {
      const form = screen.getByRole("form");
      const button = screen.getByRole("button");
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
