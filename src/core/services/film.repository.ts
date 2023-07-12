import { ApiAnswer } from "../../features/types/api.response";
import { Film } from "../../features/models/film";

export class FilmRepository {
  constructor(public url: string, public token: string) {
    this.url += "film";
  }

  async getAll(url = this.url, genre?: string): Promise<ApiAnswer> {
    let urlToSend = "";
    !genre ? (urlToSend = url) : (urlToSend = `${url}film?${genre}`);
    const response = await fetch(urlToSend);
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

  async update(id: Film["id"], item: FormData): Promise<Film> {
    const response = await fetch(this.url + "/" + id, {
      method: "PATCH",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    const updatedFilm = await response.json();

    return updatedFilm as Film;
  }

  async delete(id: Film["id"]): Promise<boolean> {
    const response = await fetch(this.url + "/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.ok;
  }

  async addComment(id: Film["id"], item: Partial<Film>) {
    const response = await fetch(this.url + "/addcomment/" + id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { Authorization: "Bearer " + this.token },
    });
    const updated = await response.json();
    return updated as Partial<Film>;
  }
}
