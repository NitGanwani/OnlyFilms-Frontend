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

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadFilmsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: payload,
    }));
  },
});

export default filmsSlice.reducer;
