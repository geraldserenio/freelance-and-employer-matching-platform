// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    userData: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
