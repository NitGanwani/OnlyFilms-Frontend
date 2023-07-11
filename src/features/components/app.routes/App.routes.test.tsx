import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { AppRoutes } from "./App.routes";
import "@testing-library/jest-dom";

describe("Given the AppRoutes component", () => {
  describe("When it is instantiate with a route /", () => {
    const MockedComponentHome = jest.fn().mockReturnValue(<h1>Home</h1>);
    jest.mock("../home/Home", () => MockedComponentHome);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Home");
    });
    test("Then it should render Home", () => {
      expect(MockedComponentHome).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /list", () => {
    const MockedComponentList = jest.fn().mockReturnValue(<h1>List</h1>);
    jest.mock("../list/List", () => MockedComponentList);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/list"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("List");
    });
    test("Then it should render List", () => {
      expect(MockedComponentList).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /register", () => {
    const MockedComponentRegister = jest
      .fn()
      .mockReturnValue(<h1>Register</h1>);
    jest.mock("../register/Register", () => MockedComponentRegister);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/register"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Register");
    });
    test("Then it should render Register", () => {
      expect(MockedComponentRegister).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /login", () => {
    const MockedComponentLogin = jest.fn().mockReturnValue(<h1>Login</h1>);
    jest.mock("../login/Login", () => MockedComponentLogin);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/login"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Login");
    });
    test("Then it should render Login", () => {
      expect(MockedComponentLogin).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /detail", () => {
    const MockedComponentDetail = jest.fn().mockReturnValue(<h1>Detail</h1>);
    jest.mock("../film.detail/FilmDetail", () => MockedComponentDetail);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/detail/:id"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Detail");
    });
    test("Then it should render Detail", () => {
      expect(MockedComponentDetail).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /create", () => {
    const MockedComponentCreate = jest.fn().mockReturnValue(<h1>Create</h1>);
    jest.mock(
      "../create.edit.film/CreateOrEditFilm",
      () => MockedComponentCreate
    );
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/create"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Create");
    });
    test("Then it should render Detail", () => {
      expect(MockedComponentCreate).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route *", () => {
    const MockedComponentError = jest.fn().mockReturnValue(<h1>Error</h1>);
    jest.mock("../error.page/ErrorPage", () => MockedComponentError);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/*"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Error");
    });
    test("Then it should render ErrorPage", () => {
      expect(MockedComponentError).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
