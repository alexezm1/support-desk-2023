import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import noteService from "./noteService";

const initialState = {
  notes: [],
  noteIsLoading: false,
};

// Get Ticket Notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.fetchNotes(ticketID, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (build) => {
    build
      .addCase(getNotes.pending, (state) => {
        state.noteIsLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.noteIsLoading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state) => {
        state.noteIsLoading = false;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
