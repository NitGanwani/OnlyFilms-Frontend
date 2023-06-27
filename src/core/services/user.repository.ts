import { User } from "../../features/models/user";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: User[];
};
export class UserRepository extends ApiRepository<User> {
  constructor(public url: string) {
    super(url);
  }

  async getAll(): Promise<User[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async register(item: Partial<User>): Promise<User> {
    const response = await fetch(this.url + "register/", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<User>;
  }

  async login(id: User["id"], item: Partial<User>): Promise<User> {
    const response = await fetch(this.url + "login/" + (id as string), {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<User>;
  }
}
