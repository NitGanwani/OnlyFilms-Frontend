import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "./ErrorPage";

describe("Given an ErrorPage component", () => {
  describe("When it is instantiate", () => {
    beforeEach(() => {
      render(<ErrorPage></ErrorPage>);
    });

    test("Then the image element should be in the document", () => {
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
