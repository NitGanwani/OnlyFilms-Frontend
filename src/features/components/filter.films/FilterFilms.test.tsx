import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import { MemoryRouter as Router } from "react-router-dom";
import { FilterFilms } from "./FilterFilms";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useFilms } from "../../hooks/use.films";

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    handlePaging: jest.fn().mockResolvedValue("http://test.com?page=2"),
    next: "http://test.com?page=3",
    previous: "http://test.com?page=1",
  }),
}));

jest.mock("../../../config", () => ({
  url: "",
}));

describe("Given the PagingButtons component", () => {
  let elements: HTMLElement[];
  describe("When it is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <FilterFilms></FilterFilms>
          </Router>
        </Provider>
      );
      elements = screen.getAllByRole("button");
    });

    test("Then it should ", async () => {
      expect(elements[0]).toBeInTheDocument();
      await userEvent.click(elements[0]);
      expect(useFilms().handlePaging).toHaveBeenCalled();
    });

    test("Then it should ", async () => {
      await userEvent.click(elements[2]);
      expect(useFilms().handlePaging).toHaveBeenCalled();
    });
  });
});
