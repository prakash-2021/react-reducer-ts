import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const prevProductsInCart = JSON.parse(
  localStorage.getItem("orderProduct") || "[]"
);

const initialState: { products: any[] } = {
  products: prevProductsInCart,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    orderProduct: (state, action: PayloadAction<any>) => {
      if (state.products === undefined) {
        return {
          products: [action.payload],
        };
      } else {
        localStorage.setItem("orderProduct", JSON.stringify(state.products));
        return {
          products: [...state.products, action.payload],
        };
      }
    },
  },
});

export default orderSlice.reducer;
export const { orderProduct } = orderSlice.actions;
