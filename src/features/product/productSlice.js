import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduts, fetchProdutsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProdutsAsync = createAsyncThunk(
  "product/fetchAllProduts",
  async () => {
    const response = await fetchAllProduts();
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProdutsByFiltersAsync = createAsyncThunk(
  "product/fetchProdutsByFilters",
  async ({ filter, sort }) => {
    const response = await fetchProdutsByFilters(filter, sort);
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProdutsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProdutsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProdutsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProdutsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
