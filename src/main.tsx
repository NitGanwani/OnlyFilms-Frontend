import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { App } from "./features/components/app/App";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
);
