import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import categoryReducer from "../features/categorySlice";
import blogReducer from "../features/blogSlice";
import authReducer from "../features/authSlice";
import commentReducer from "../features/commentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  blog: blogReducer,
  comment: commentReducer,
});

const persistConfig = {
  key: "KEY",
  storage,
  whiteList: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
