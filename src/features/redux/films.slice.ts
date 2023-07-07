import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Film } from "../models/film";
import { FilmRepository } from "../../core/services/film.repository";

export type FilmsState = {
  films: Film[];
};

const initialState: FilmsState = {
  films: [] as Film[],
};

export const loadFilmsAsync = createAsyncThunk(
  "films/load",
  async (repo: FilmRepository) => {
    const response = await repo.getAll();
    return response;
  }
);

export const createFilmAsync = createAsyncThunk<
  Film,
  { repo: FilmRepository; film: FormData }
>("films/create", async ({ repo, film }) => {
  return await repo.create(film);
});

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadFilmsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: payload,
    }));
    builder.addCase(createFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: [...state.films, payload],
    }));
  },
});

export default filmsSlice.reducer;
