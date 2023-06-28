import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";

export type UsersState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string;
};

const initialState: UsersState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem("userToken") as string | undefined,
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
  Partial<User>,
  { repo: UserRepository; user: Partial<User> }
>("users/login", async ({ repo, user }) => {
  const result = await repo.login(user);
  return result;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
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
export const ac = usersSlice.actions;
