import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CollectionService, type Product } from "@/services/collection/index.service";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await CollectionService.getProducts();
});

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load products right now. Please try again.";
      });
  },
});

export default productsSlice.reducer;
