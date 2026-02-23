import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  CartService,
  type CartItem,
  type PlaceOrderPayload,
} from "@/services/cart/index.service";

export const fetchCartDetails = createAsyncThunk(
  "cart/fetchCartDetails",
  async () => {
    return await CartService.getCartDetails();
  }
);

export const placeOrder = createAsyncThunk<
  { success: boolean; orderId: string },
  PlaceOrderPayload,
  { rejectValue: string }
>("cart/placeOrder", async (payload, { rejectWithValue }) => {
  try {
    return await CartService.placeOrder(payload);
  } catch {
    return rejectWithValue("Unable to place your order right now. Please try again.");
  }
});

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  placingOrder: boolean;
  placeOrderError: string | null;
  lastOrderId: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  placingOrder: false,
  placeOrderError: null,
  lastOrderId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearOrderFeedback: (state) => {
      state.placeOrderError = null;
      state.lastOrderId = null;
      state.placingOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCartDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to fetch cart details right now. Please try again.";
      })
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
        state.placeOrderError = null;
        state.lastOrderId = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.placeOrderError = null;
        state.lastOrderId = action.payload.orderId;
        state.items = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placingOrder = false;
        state.placeOrderError =
          action.payload ?? "Unable to place your order right now. Please try again.";
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
