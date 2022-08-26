import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

interface totalInformation {
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  product: ProductsType[];
}

const prevProductsInCart = JSON.parse(
  localStorage.getItem("orderProduct") || "[]"
);

const initialState: { products: totalInformation[] } = {
  products: prevProductsInCart,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    orderProduct: (state, action: PayloadAction<totalInformation>) => {
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
