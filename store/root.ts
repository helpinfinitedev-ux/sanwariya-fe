import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import collectionsReducer from "./slices/collections";
import cartReducer from "./slices/cart";
import ordersReducer from "./slices/orders";
import testimonialsReducer from "./slices/testimonials";

const rootReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  testimonials: testimonialsReducer,
});

export default rootReducer;
