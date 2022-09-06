import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bulma/css/bulma.css";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
