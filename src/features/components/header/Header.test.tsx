import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import { MemoryRouter as Router } from "react-router-dom";

describe("Given Header component", () => {
  describe("When it is instantiate", () => {
    const title = "OnlyFilms";
    const subtitle = "Hello";

    render(
      <Router>
        <Provider store={store}>
          <Header title={title} subtitle={subtitle}></Header>
        </Provider>
      </Router>
    );

    test("Then it should be in the document", () => {
      const element = screen.getByRole("banner");
      expect(element).toBeInTheDocument();
    });
  });
});
