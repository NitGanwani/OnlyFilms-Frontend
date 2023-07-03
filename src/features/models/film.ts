import { Image } from "../components/types/image";

export type Film = {
  id: string;
  title: string;
  release: string;
  genre: "Action" | "Drama" | "Comedy" | "Horror" | "Sci-Fi" | "Animation";
  synopsis: string;
  poster: Image;
};
