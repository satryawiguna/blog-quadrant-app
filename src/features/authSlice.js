import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    userId: null,
    userEmail: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.logged = action.payload.logged;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
