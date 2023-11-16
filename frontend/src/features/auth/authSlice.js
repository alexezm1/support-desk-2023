import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import authService from "./authService";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
};

// Register new User
export const registerData = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Login User
export const loginData = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerData.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(loginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginData.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
