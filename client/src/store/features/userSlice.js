import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/auth";
import { BASE_URL } from "../../constants";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid email or password.";
      })
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getCurrentUserAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid token, please login again.";
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const loginAsync = createAsyncThunk("user/login", async (data) => {
  return await axios.post(`${BASE_URL}/login`, data);
});

export const getCurrentUserAsync = createAsyncThunk(
  "user/getCurrentUser",
  async (token) => {
    return await getCurrentUser(token);
  }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
