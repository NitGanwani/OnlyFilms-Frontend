import { ApiAnswer } from "../../features/types/api.response";
import { Film } from "../../features/models/film";
import { store } from "../store/store";

export class FilmRepository {
  constructor(public url: string, public token: string) {}

  async getAll(): Promise<ApiAnswer> {
    const offset = store.getState().films.page;
    const response = await fetch(`${this.url}?offset=${offset - 1}`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = (await response.json()) as ApiAnswer;
    return answer;
  }

  async create(item: FormData): Promise<Film> {
    const response = await fetch(this.url + "/", {
      method: "POST",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Film>;
  }

  async udpdate(id: Film["id"], item: FormData): Promise<Film> {
    const response = await fetch(this.url + "/" + id, {
      method: "PATCH",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Film>;
  }

  async delete(id: Film["id"]): Promise<boolean> {
    const response = await fetch(this.url + "/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.ok;
  }
}
