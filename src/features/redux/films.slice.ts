import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Film } from "../models/film";
import { FilmRepository } from "../../core/services/film.repository";

export type FilmsState = {
  films: Film[];
  count: number;
  page: number;
};

const initialState: FilmsState = {
  films: [] as Film[],
  count: 0,
  page: 1,
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
    nextPage: (state) => ({
      ...state,
      page: state.page + 1,
    }),
    previousPage: (state) => ({
      ...state,
      page: state.page - 1,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(loadFilmsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: payload.items,
      count: payload.count,
      page: payload.page,
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
export const ac = filmsSlice.actions;
