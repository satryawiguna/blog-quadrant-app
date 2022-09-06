import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    user: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.logged = action.payload.logged;
      state.user = action.payload.user;
    },
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
