import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  ticketIsLoading: false,
};

// Create new ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.create(ticketData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(createTicket.pending, (state) => {
        state.ticketIsLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.ticketIsLoading = false;
      })
      .addCase(createTicket.rejected, (state) => {
        state.ticketIsLoading = false;
      });
  },
});

export default ticketSlice.reducer;
