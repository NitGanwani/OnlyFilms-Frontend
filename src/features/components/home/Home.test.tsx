import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";

describe("Given the Home component", () => {
  describe("When it is rendered", () => {
    beforeEach(() => {
      render(
        <Router>
          <Home></Home>
        </Router>
      );
    });

    test("Then it should render a header", () => {
      const welcomeMessage = screen.getByRole("banner");
      expect(welcomeMessage).toBeInTheDocument();
    });
  });
});
