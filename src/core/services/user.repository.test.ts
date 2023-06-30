import { UserRepository } from "./user.repository";

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository("https://onlyfilms.sampleurl.com/");
  });

  describe("When calling the register method", () => {
    test("Then it should fetch data from the API and return the response", async () => {
      const user = {
        userName: "Sergio Master of CSS",
        email: "sergio@soytupapasito.com",
        password: "CSS4ever",
      };

      const expectedUrl = "https://onlyfilms.sampleurl.com/user/register";
      const mockResponse = {
        id: "1",
        userName: "Sergio Master of CSS",
        email: "sergio@soytupapasito.com",
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const registeredUser = await userRepository.register(user);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      expect(registeredUser).toEqual(mockResponse);
    });
  });

  describe("When calling the login method", () => {
    test("Then it should fetch data from the API and return the response", async () => {
      const user = {
        email: "sergio@soytupapasito.com",
        password: "password123",
      };

      const expectedUrl = "https://onlyfilms.sampleurl.com/user/login";
      const mockResponse = {
        id: "1",
        userName: "Sergio Master of CSS",
        email: "sergio@soytupapasito.com",
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const loggedInUser = await userRepository.login(user);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      expect(loggedInUser).toEqual(mockResponse);
    });
  });
});
