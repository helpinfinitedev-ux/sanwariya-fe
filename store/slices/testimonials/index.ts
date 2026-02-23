import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TestimonialService,
  type Testimonial,
} from "@/services/testimonials/index.service";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async () => {
    return await TestimonialService.getTestimonials();
  }
);

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTestimonials.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load testimonials right now. Please try again.";
      });
  },
});

export default testimonialsSlice.reducer;

