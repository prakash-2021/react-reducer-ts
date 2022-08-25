import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface actionType {
  product: {
    id: string;
    name: string;
    quantity: number;
  };
  total: number;
  id: string;
}

type productsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  total: number;
};

interface product {
  id: string;
  name: string;
  quantity: number;
}

const prevProductsInCart = JSON.parse(
  localStorage.getItem("selectedProduct") || "[]"
);

const initialState: { products: any[]; total: number } = {
  products: prevProductsInCart,
  total: 0,
};

const productsInCartSlice = createSlice({
  name: "productsInCartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<product>) => {
      state.products = [...state.products, action.payload];
    },
    checkOutProduct: (state, action: PayloadAction<productsType[]>) => {
      state.products = [action.payload];
      // state.total = action.payload[0].total;
    },
    increaseQuantity: (state, action: PayloadAction<actionType>) => {
      state.products = [action.payload.product];
    },
  },
});

export default productsInCartSlice.reducer;
export const { addToCart, checkOutProduct, increaseQuantity } =
  productsInCartSlice.actions;
