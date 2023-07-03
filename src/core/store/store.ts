import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import usersSlice from "../../features/redux/users.slice";
import filmsSlice from "../../features/redux/films.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    films: filmsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
