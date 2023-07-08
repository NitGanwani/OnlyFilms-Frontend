import { ApiAnswer } from "../../features/types/api.response";
import { Film } from "../../features/models/film";

export class FilmRepository {
  constructor(public url: string, public token: string) {}

  async getAll(): Promise<Film[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = (await response.json()) as ApiAnswer;
    return answer.items;
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
}
