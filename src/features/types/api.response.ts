import { Film } from "../models/film";
import { User } from "../models/user";

export type ApiAnswer = {
  items: Film[];
};

export type ApiResponse = {
  token: string;
  user: User;
};
