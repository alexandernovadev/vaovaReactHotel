import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "non-authenticated",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMessage: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = '';
    },
    logout: (state, { payload }) => {
      state.status = "non-authenticated";
      state.uid = '';
      state.email = '';
      state.displayName = '';
      state.photoURL = '';
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.errorMessage = '';
    },
    checkingCredentialsFirebase: (state) => {
      state.status = "process";
      state.errorMessage = '';
    },
  },
});

export const { login, logout, checkingCredentials, checkingCredentialsFirebase } = authSlice.actions;
