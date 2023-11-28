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

// Get user tickets
export const getTickets = createAsyncThunk(
  "tickets/getUserTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.fetchTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get single ticket
export const getTicket = createAsyncThunk(
  "tickets/getUserTicket",
  async (ticketID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.fetchTicket(ticketID, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (build) => {
    build
      .addCase(createTicket.pending, (state) => {
        state.ticketIsLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.ticketIsLoading = false;
      })
      .addCase(createTicket.rejected, (state) => {
        state.ticketIsLoading = false;
      })
      .addCase(getTickets.pending, (state) => {
        state.ticketIsLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.ticketIsLoading = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state) => {
        state.ticketIsLoading = false;
      })
      .addCase(getTicket.pending, (state) => {
        state.ticketIsLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticketIsLoading = false;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state) => {
        state.ticketIsLoading = false;
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
