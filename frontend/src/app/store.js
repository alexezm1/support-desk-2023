import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import noteSlice from "../features/notes/noteSlice";
import productSlice from "../features/products/productSlice";
import ticketSlice from "../features/tickets/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ticket: ticketSlice,
    notes: noteSlice,
    products: productSlice,
  },
});
