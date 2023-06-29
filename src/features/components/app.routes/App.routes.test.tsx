import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { AppRoutes } from "./App.routes";
import "@testing-library/jest-dom";

const MockedComponent = jest
  .fn()
  .mockReturnValue(<h1>Nitin Component Test</h1>);

jest.mock("../home/Home", () => MockedComponent);
jest.mock("../list/List", () => MockedComponent);
jest.mock("../register/Register", () => MockedComponent);
jest.mock("../login/Login", () => MockedComponent);

describe("Given the AppRoutes component", () => {
  describe("When it is instantiate with a route /", () => {
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Nitin Component Test");
    });
    test("Then it should render Home", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /list", () => {
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/list"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Nitin Component Test");
    });
    test("Then it should render List", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /register", () => {
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/register"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Nitin Component Test");
    });
    test("Then it should render Register", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiate with a route /login", () => {
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/login"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );

      element = screen.getByText("Nitin Component Test");
    });
    test("Then it should render Login", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
