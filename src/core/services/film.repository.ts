import { ApiAnswer } from "../../features/types/api.response";
import { Film } from "../../features/models/film";

export class FilmRepository {
  constructor(public url: string) {}

  async getAll(): Promise<Film[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = (await response.json()) as ApiAnswer;
    console.log(answer);
    return answer.items;
  }
}
