import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrdersService, type Order } from "@/services/orders/index.service";
import type { RootState } from "@/store";
import { userActions } from "../user";

export const fetchMyOrders = createAsyncThunk<
  Order[],
  void,
  { state: RootState; rejectValue: string }
>("orders/fetchMyOrders", async (_, { getState, rejectWithValue }) => {
  try {
    const userId = getState().user.user?._id;
    if (!userId) return [];
    return await OrdersService.getMyOrders(userId);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      err.response?.data?.message || "Unable to fetch your orders right now. Please try again."
    );
  }
});

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to fetch your orders right now. Please try again.";
      })
      .addCase(userActions.logout, () => {
        return initialState;
      });
  },
});

export default ordersSlice.reducer;
