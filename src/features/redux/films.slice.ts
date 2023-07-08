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

export const updateFilmAsync = createAsyncThunk<
  Film,
  { repo: FilmRepository; id: Film["id"]; film: FormData }
>("films/update", async ({ repo, id, film }) => {
  return await repo.udpdate(id, film);
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
    builder.addCase(updateFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: state.films.map((item) =>
        item.id === payload.id ? payload : item
      ),
    }));
  },
});

export default filmsSlice.reducer;
