import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { useMemo } from "react";
import { ac, loginUserAsync, registerUserAsync } from "../redux/users.slice";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { url } from "../../config";

export function useUsers() {
  const { users, currentUser, token, isError } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch: AppDispatch = useDispatch();

  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (user: Partial<User>) => {
    await dispatch(loginUserAsync({ repo, user }));
  };

  const handleLogoutUser = () => {
    dispatch(ac.logoutUser());
    localStorage.removeItem("userToken");
  };

  return {
    users,
    handleRegisterUser,
    handleLoginUser,
    currentUser,
    token: token,
    handleLogoutUser,
    isError,
  };
}
