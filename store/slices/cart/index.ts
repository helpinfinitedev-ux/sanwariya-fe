import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartService, type CartItem } from "@/services/cart/index.service";
import type { RootState } from "@/store";
import { userActions } from "../user";

export const fetchCartDetails = createAsyncThunk<
  { cartId: string | null; items: CartItem[] },
  void,
  { state: RootState; rejectValue: string }
>("cart/fetchCartDetails", async (_, { getState, rejectWithValue }) => {
  try {
    const userId = getState().user.user?._id;
    if (!userId) return { cartId: null, items: [] };

    const cart = await CartService.getCartDetails(userId);
    if (!cart) return { cartId: null, items: [] };

    return { cartId: cart.cartId, items: cart.items };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Unable to fetch cart details right now. Please try again.");
  }
});

export const addItemToCart = createAsyncThunk<
  { cartId: string; items: CartItem[] },
  Omit<CartItem, "id">,
  { state: RootState; rejectValue: string }
>("cart/addItemToCart", async (item, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state.user.user?._id;
    const { cartId, items } = state.cart;

    if (!userId) return rejectWithValue("Please login to add items to cart.");

    const existing = items.find(
      (cartItem) =>
        cartItem.productId === item.productId && cartItem.unit === item.unit
    );

    const mergedItems = existing
      ? items.map((cartItem) =>
          cartItem.id === existing.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      : [
          ...items,
          {
            ...item,
            id: `${item.productId}-${item.unit}`,
          },
        ];

    const response = cartId
      ? await CartService.updateCart(cartId, mergedItems)
      : await CartService.createCart(userId, mergedItems);

    return { cartId: response.cartId, items: response.items };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Unable to add item to cart right now. Please try again.");
  }
});

export const updateCartItemQuantity = createAsyncThunk<
  { cartId: string; items: CartItem[] },
  { itemId: string; delta: 1 | -1 },
  { state: RootState; rejectValue: string }
>("cart/updateCartItemQuantity", async ({ itemId, delta }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state.user.user?._id;
    const { cartId, items } = state.cart;

    if (!userId) return rejectWithValue("Please login to update your cart.");
    if (!items.length) return rejectWithValue("Your cart is empty.");

    const updatedItems = items.map((item) => {
      if (item.id !== itemId) return item;
      const nextQuantity = Math.max(1, item.quantity + delta);
      return { ...item, quantity: nextQuantity };
    });

    const response = cartId
      ? await CartService.updateCart(cartId, updatedItems)
      : await CartService.createCart(userId, updatedItems);

    return { cartId: response.cartId, items: response.items };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Unable to update cart item right now. Please try again.");
  }
});

export const placeOrder = createAsyncThunk<
  { orderId: string },
  { phoneNumber: string; address: string },
  { state: RootState; rejectValue: string }
>("cart/placeOrder", async (payload, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state.user.user?._id;
    const { cartId, items } = state.cart;

    if (!userId) return rejectWithValue("Please login to place an order.");
    if (!items.length) return rejectWithValue("Your cart is empty.");

    return await CartService.placeOrder({
      cartId: cartId || undefined,
      userId,
      phoneNumber: payload.phoneNumber,
      address: payload.address,
      items,
    });
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Unable to place your order right now. Please try again.");
  }
});

interface CartState {
  cartId: string | null;
  items: CartItem[];
  loading: boolean;
  error: string | null;
  placingOrder: boolean;
  placeOrderError: string | null;
  lastOrderId: string | null;
  updatingItem: boolean;
  addItemError: string | null;
  addingItem: boolean;
}

const initialState: CartState = {
  cartId: null,
  items: [],
  loading: false,
  error: null,
  placingOrder: false,
  placeOrderError: null,
  lastOrderId: null,
  updatingItem: false,
  addItemError: null,
  addingItem: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to fetch cart details right now. Please try again.";
      })
      .addCase(addItemToCart.pending, (state) => {
        state.addingItem = true;
        state.addItemError = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.addingItem = false;
        state.addItemError = null;
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.addingItem = false;
        state.addItemError = action.payload ?? "Unable to add item to cart right now. Please try again.";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.updatingItem = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.updatingItem = false;
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.updatingItem = false;
        state.error = action.payload ?? "Unable to update cart item right now. Please try again.";
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
        state.cartId = null;
        state.items = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placingOrder = false;
        state.placeOrderError =
          action.payload ?? "Unable to place your order right now. Please try again.";
      })
      .addCase(userActions.logout, () => {
        return initialState;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
