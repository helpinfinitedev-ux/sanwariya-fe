import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import collectionsReducer from "./slices/collections";
import productsReducer from "./slices/products";
import categoriesReducer from "./slices/categories";
import cartReducer from "./slices/cart";
import ordersReducer from "./slices/orders";
import testimonialsReducer from "./slices/testimonials";

const rootReducer = combineReducers({
  user: userReducer,
  collections: collectionsReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  testimonials: testimonialsReducer,
});

export default rootReducer;
