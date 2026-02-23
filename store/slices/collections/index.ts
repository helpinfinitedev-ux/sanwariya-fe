import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  CollectionService,
  type Product,
} from "@/services/collection/index.service";

export const fetchProducts = createAsyncThunk(
  "collections/fetchProducts",
  async () => {
    return await CollectionService.getProducts();
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
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
  { productId: number; category: string },
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
  products: Product[];
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
  currentProductLoading: boolean;
  currentProductError: string | null;
  relatedProducts: Product[];
  relatedProductsLoading: boolean;
  relatedProductsError: string | null;
  activeCategory: string;
  currentPage: number;
}

const initialState: CollectionsState = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  currentProductLoading: false,
  currentProductError: null,
  relatedProducts: [],
  relatedProductsLoading: false,
  relatedProductsError: null,
  activeCategory: "all",
  currentPage: 1,
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load products right now. Please try again.";
      })
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
