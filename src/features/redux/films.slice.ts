import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Film } from "../models/film";
import { FilmRepository } from "../../core/services/film.repository";
import { ApiAnswer, GetFilmPayload } from "../types/api.response";

export type FilmsState = {
  films: Film[];
  count: number;
  next: string | null;
  previous: string | null;
};

const initialState: FilmsState = {
  films: [] as Film[],
  count: 0,
  next: null,
  previous: null,
};

export const loadFilmsAsync = createAsyncThunk<ApiAnswer, GetFilmPayload>(
  "films/load",
  async ({ repo, url, genre }) => {
    const response = await repo.getAll(url, genre);
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

export const deleteFilmAsync = createAsyncThunk<
  string,
  { repo: FilmRepository; id: Film["id"] }
>("films/delete", async ({ repo, id }) => {
  const response = await repo.delete(id);
  return response ? id : "";
});

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    // nextPage: (state) => ({
    //   ...state,
    //   page: state.page + 1,
    // }),
    // previousPage: (state) => ({
    //   ...state,
    //   page: state.page - 1,
    // }),
  },
  extraReducers: (builder) => {
    builder.addCase(loadFilmsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: payload.items,
      count: payload.count,
      next: payload.next,
      previous: payload.previous,
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
    builder.addCase(deleteFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: state.films.filter((item) => item.id !== payload),
    }));
  },
});

export default filmsSlice.reducer;
