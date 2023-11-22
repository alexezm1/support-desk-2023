import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import productService from "./productService";

const initialState = {
  products: null,
  isLoading: false,
};

// Get existing products
export const getProductsData = createAsyncThunk(
  "products/getProduct",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductsData.rejected, (state) => {
        state.products = null;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
