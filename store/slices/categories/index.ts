import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CollectionService, type Category } from "@/services/collection/index.service";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await CollectionService.getCategories();
  }
);

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load categories right now. Please try again.";
      });
  },
});

export default categoriesSlice.reducer;
