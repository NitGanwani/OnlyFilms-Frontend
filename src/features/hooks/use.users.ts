import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "../../core/store/store";
import { useCallback, useMemo } from "react";
import {
  ac,
  loadUsersAsync,
  loginUserAsync,
  registerUserAsync,
} from "../redux/users.slice";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";

export function useUsers() {
  const { users, currentUser, token } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:7777/";

  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleLoadUsers = useCallback(async () => {
    dispatch(loadUsersAsync(repo));
  }, [repo, dispatch]);

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (user: Partial<User>) => {
    await dispatch(loginUserAsync({ repo, user }));
    const loggedUser = store.getState().users.currentUser;
    console.log(loggedUser);
    localStorage.setItem("userToken", loggedUser.token as string);
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  return {
    handleLoadUsers,
    users,
    handleRegisterUser,
    handleLoginUser,
    currentUser,
    token: token,
    handleGetToken,
  };
}
