import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import productService from "./productService";

const initialState = {
  products: null,
  productIsLoading: false,
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
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.productIsLoading = true;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productIsLoading = false;
      })
      .addCase(getProductsData.rejected, (state) => {
        state.products = null;
        state.productIsLoading = false;
      });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
