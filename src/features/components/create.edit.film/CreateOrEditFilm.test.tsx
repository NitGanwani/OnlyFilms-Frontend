import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
// import { useFilms } from "../../hooks/use.films";
import CreateOrEditFilm from "./CreateOrEditFilm";

jest.mock("../../hooks/use.films", () => ({
  useFilms: jest.fn().mockReturnValue({
    handleCreateFilm: jest.fn(),
    handleUpdateFilm: jest.fn(),
    handleLoadFilms: jest.fn(),
    films: [
      {
        id: "1",
        title: "Gafo",
        release: "2003",
        genre: "goofy",
        synopsis: "David's life",
      },
    ],
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe("Given the CreateFilm component", () => {
  // beforeEach(async () => {
  //   await act(async () => {
  //     render(
  //       <Provider store={store}>
  //         <Router initialEntries={["/update/1"]}>
  //           <CreateOrEditFilm></CreateOrEditFilm>
  //         </Router>
  //       </Provider>
  //     );
  //   });
  // });
  describe("When it is rendered", () => {
    test("Then it should have a Sing Up button in the form", async () => {
      render(
        <Provider store={store}>
          <Router initialEntries={["/update/1"]}>
            <CreateOrEditFilm></CreateOrEditFilm>
          </Router>
        </Provider>
      );
      const title = screen.getByLabelText("title");
      expect(title).toBeInTheDocument();
    });

    // test("Then the handleCreateFilm function should be called", async () => {
    //   const form = screen.getByRole("form");
    //   await fireEvent.submit(form);
    //   expect(useFilms().handleCreateFilm).toHaveBeenCalled();
    // });

    // test("Then the handleUpdateFilm function should be called", async () => {
    //   const form = screen.getByRole("form");
    //   await fireEvent.submit(form);
    //   expect(useFilms().handleUpdateFilm).toHaveBeenCalled();
    // });
  });
});
