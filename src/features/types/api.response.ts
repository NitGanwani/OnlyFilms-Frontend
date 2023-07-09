import { Film } from "../models/film";
import { User } from "../models/user";

export type ApiAnswer = {
  items: Film[];
  page: number;
  count: number;
};

export type ApiResponse = {
  token: string;
  user: User;
};
