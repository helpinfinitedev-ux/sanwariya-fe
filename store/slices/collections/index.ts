import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CollectionService, type Product } from "@/services/collection/index.service";

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("collections/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    return await CollectionService.getProductById(id);
  } catch {
    return rejectWithValue("Product not found.");
  }
});

export const fetchRelatedProducts = createAsyncThunk<
  Product[],
  { productId: string; category: string },
  { rejectValue: string }
>(
  "collections/fetchRelatedProducts",
  async ({ productId, category }, { rejectWithValue }) => {
    try {
      return await CollectionService.getRelatedProducts(productId, category);
    } catch {
      return rejectWithValue("Unable to load related products.");
    }
  }
);

interface CollectionsState {
  currentProduct: Product | null;
  currentProductLoading: boolean;
  currentProductError: string | null;
  relatedProducts: Product[];
  relatedProductsLoading: boolean;
  relatedProductsError: string | null;
}

const initialState: CollectionsState = {
  currentProduct: null,
  currentProductLoading: false,
  currentProductError: null,
  relatedProducts: [],
  relatedProductsLoading: false,
  relatedProductsError: null,
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    clearProductDetailsState: (state) => {
      state.currentProduct = null;
      state.currentProductLoading = false;
      state.currentProductError = null;
      state.relatedProducts = [];
      state.relatedProductsLoading = false;
      state.relatedProductsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductLoading = true;
        state.currentProductError = null;
        state.currentProduct = null;
        state.relatedProducts = [];
        state.relatedProductsError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProductLoading = false;
        state.currentProductError = null;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentProductLoading = false;
        state.currentProductError =
          action.payload ?? "Unable to load product right now. Please try again.";
      })
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedProductsLoading = true;
        state.relatedProductsError = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProductsLoading = false;
        state.relatedProductsError = null;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedProductsLoading = false;
        state.relatedProductsError =
          action.payload ??
          "Unable to load related products right now. Please try again.";
      });
  },
});

export const collectionsActions = collectionsSlice.actions;
export default collectionsSlice.reducer;
