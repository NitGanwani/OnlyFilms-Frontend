import { Film } from "../../features/models/film";
import { FilmRepository } from "./film.repository";

describe("Given the FilmRepository class", () => {
  let filmRepo: FilmRepository;

  const mockToken = "mytoken";

  beforeEach(() => {
    filmRepo = new FilmRepository("http://onlyfilms.com/", mockToken);
  });
  describe("When calling the getAll method", () => {
    test("Then it should fetch data from the API and return the response", async () => {
      const mockData = [{}];
      const expectedUrl = "http://onlyfilms.com/film";

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await filmRepo.getAll();

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockData);
    });

    test("Then it should fetch data from the API and return the response", async () => {
      const mockData = [{}];
      const genre = "genre";
      const expectedUrl = "http://onlyfilms.com/";

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await filmRepo.getAll(expectedUrl, genre);

      expect(global.fetch).toHaveBeenCalledWith(
        expectedUrl + "film" + "?" + genre
      );
      expect(response).toEqual(mockData);
    });

    test("Then it should throw an error if the fetch is not successful", async () => {
      const expectedUrl = "http://onlyfilms.com/film";
      const mockErrorMessage = "No data found";
      const error = new Error("Error: 400. No data found");

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: mockErrorMessage,
      });

      await expect(filmRepo.getAll()).rejects.toThrow(error);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe("When calling the create method", () => {
    test("Then it should fecth data from the API and return the response", async () => {
      const filmData = {} as unknown as FormData;
      const expectedUrl = "http://onlyfilms.com/film/";

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(filmData),
      });

      const response = await filmRepo.create(filmData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        body: filmData,
        headers: { Authorization: "Bearer " + mockToken },
      });
      expect(response).toEqual(filmData);
    });
  });

  describe("When calling the update method", () => {
    test("Then it should fecth data from the API and return the response", async () => {
      const mockId = "1";
      const filmData = { id: "1" } as unknown as FormData;
      const expectedUrl = `http://onlyfilms.com/film/1`;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(filmData),
      });

      const response = await filmRepo.update(mockId, filmData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "PATCH",
        body: filmData,
        headers: {
          Authorization: "Bearer " + mockToken,
        },
      });
      expect(response).toEqual(filmData);
    });
  });

  describe("When calling the delete method", () => {
    test("Then it should send a DELETE request to the API and return the response status", async () => {
      const mockId = "1";
      const expectedUrl = `http://onlyfilms.com/film/${mockId}`;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
      });

      const response = await filmRepo.delete(mockId);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + mockToken,
        },
      });
      expect(response).toEqual(true);
    });
  });

  describe("When calling the addComment method", () => {
    test("Then it should fecth data from the API and return the response", async () => {
      const mockId = "1";
      const filmData = { id: "1" } as unknown as Partial<Film>;
      const expectedUrl = `http://onlyfilms.com/film/addcomment/1`;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(filmData),
      });

      const response = await filmRepo.addComment(mockId, filmData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "PATCH",
        body: JSON.stringify(filmData),
        headers: {
          Authorization: "Bearer " + mockToken,
        },
      });
      expect(response).toEqual(filmData);
    });
  });
});
