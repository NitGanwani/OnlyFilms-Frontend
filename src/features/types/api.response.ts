import { Film } from "../models/film";
import { User } from "../models/user";

export type ApiAnswer = {
  items: Film[];
  next: string | null;
  previous: string | null;
  count: number;
};

export type ApiResponse = {
  token: string;
  user: User;
};
