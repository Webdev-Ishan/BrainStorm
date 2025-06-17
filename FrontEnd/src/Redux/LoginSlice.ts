import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  login: boolean;
}

const initialState: LoginState = {
  login: JSON.parse(localStorage.getItem("login") || "false"),
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    Login: (state) => {
      state.login = true;
      localStorage.setItem("login", JSON.stringify(true));
    },
    Logout: (state) => {
      state.login = false;
      localStorage.setItem("login", JSON.stringify(false));
    },
  },
});

// Action creators are generated for each case reducer function
export const { Login, Logout } = loginSlice.actions;

export default loginSlice.reducer;
