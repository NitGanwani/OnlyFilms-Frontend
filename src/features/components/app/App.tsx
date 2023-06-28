import { useEffect } from "react";
import { useUsers } from "../../hooks/use.users";
import { AppRoutes } from "../app.routes/App.routes";
import { store } from "../../../core/store/store";

export function App() {
  const { handleGetToken } = useUsers();
  const userToken = store.getState().users.currentUser.token;

  useEffect(() => {
    const loggedUserToken = localStorage.getItem("userToken");
    if (loggedUserToken) {
      handleGetToken(loggedUserToken);
      localStorage.setItem("userToken", loggedUserToken);
      console.log("Hay token: " + userToken);
    }
  });

  return (
    <>
      <AppRoutes></AppRoutes>
    </>
  );
}
