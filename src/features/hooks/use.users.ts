import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { useCallback, useMemo } from "react";
import {
  loadUsersAsync,
  loginUserAsync,
  registerUserAsync,
} from "../redux/users.slice";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";

export function useUsers() {
  const { users, currentUser } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const url = "https://nitin-onlyfilms.onrender.com/";

  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleLoadUsers = useCallback(async () => {
    dispatch(loadUsersAsync(repo));
  }, [repo, dispatch]);

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (id: string, user: Partial<User>) => {
    dispatch(loginUserAsync({ repo, id, user }));
  };

  return {
    handleLoadUsers,
    users,
    handleRegisterUser,
    handleLoginUser,
    currentUser,
  };
}
