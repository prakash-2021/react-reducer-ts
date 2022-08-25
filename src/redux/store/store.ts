import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import orderSlice from "../slice/orderSlice";
import productSlice from "../slice/productSlice";
import userAccountSlice from "../slice/userAccountSlice";

const store = configureStore({
  reducer: {
    cartSlice,
    orderSlice,
    productSlice,
    userAccountSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;