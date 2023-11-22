import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { productSlice } from "../features/products/productSlice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productSlice.reducer },
});
