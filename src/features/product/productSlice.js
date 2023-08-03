import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProduts,
  fetchProdutsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
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

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProdutsByFiltersAsync = createAsyncThunk(
  "product/fetchProdutsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProdutsByFilters(filter, sort, pagination);
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalitems = (state) => state.product.totalItems;

export default productSlice.reducer;
