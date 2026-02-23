import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrdersService, type Order } from "@/services/orders/index.service";

export const fetchMyOrders = createAsyncThunk("orders/fetchMyOrders", async () => {
  return await OrdersService.getMyOrders();
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
      .addCase(fetchMyOrders.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to fetch your orders right now. Please try again.";
      });
  },
});

export default ordersSlice.reducer;

