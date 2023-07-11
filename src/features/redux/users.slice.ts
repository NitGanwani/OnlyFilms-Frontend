import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { ApiResponse } from "../types/api.response";

export type UsersState = {
  users: User[];
  currentUser: User["userName"];
  token?: string;
  isError: boolean | null;
  userFilms: User["films"];
};

const initialState: UsersState = {
  users: [] as User[],
  currentUser: "",
  token: localStorage.getItem("userToken") as string | undefined,
  isError: null,
  userFilms: [],
};

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; user: Partial<User> }
>("users/register", async ({ repo, user }) => {
  return await repo.register(user);
});

export const loginUserAsync = createAsyncThunk<
  ApiResponse,
  { repo: UserRepository; user: Partial<User> }
>("users/login", async ({ repo, user }) => {
  const result = await repo.login(user);
  localStorage.setItem("userToken", result.token as string);
  return result;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => ({
      ...state,
      token: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.rejected, (state) => ({
      ...state,
      isError: true,
    }));
    builder.addCase(loginUserAsync.pending, (state) => ({
      ...state,
      isError: null,
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload.user.userName,
      userFilms: payload.user.films,
      token: payload.token,
      isError: false,
    }));
  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
