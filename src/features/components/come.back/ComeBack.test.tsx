import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ComeBack } from "./ComeBack";
import { MemoryRouter as Router } from "react-router-dom";

describe("Given a ComeBack component", () => {
  describe("When it is intantiated", () => {
    render(
      <Router>
        <ComeBack></ComeBack>
      </Router>
    );
    test("Then it should be in the document", () => {
      const element = screen.getByRole("banner");
      expect(element).toBeInTheDocument();
    });
  });
});
