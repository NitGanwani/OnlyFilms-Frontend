import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";

export type UsersState = {
  users: User[];
  currentUser: User;
};

const initialState: UsersState = {
  users: [] as User[],
  currentUser: {} as User,
};

export const loadUsersAsync = createAsyncThunk(
  "users/load",
  async (repo: UserRepository) => {
    const response = await repo.getAll();
    return response;
  }
);

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; user: Partial<User> }
>("users/register", async ({ repo, user }) => {
  return await repo.register(user);
});

export const loginUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; id: string; user: Partial<User> }
>("users/login", async ({ repo, id, user }) => {
  return await repo.login(id, user);
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsersAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: payload,
    }));
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }));
  },
});

export default usersSlice.reducer;
