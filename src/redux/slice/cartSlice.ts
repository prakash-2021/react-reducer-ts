import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

interface Product {
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
    addToCart: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
      localStorage.setItem("selectedProduct", JSON.stringify(state.products));
    },
    checkOutProduct: (state, action: PayloadAction<ProductsType[]>) => {
      state.products = [...action.payload];
      localStorage.setItem("selectedProduct", JSON.stringify(state.products));
    },
    totalQuantity: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
      localStorage.setItem("selectedProduct", JSON.stringify(state.products));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state.products[action.payload].quantity += 1;
      localStorage.setItem("selectedProduct", JSON.stringify(state.products));
    },
  },
});

export default productsInCartSlice.reducer;
export const { addToCart, checkOutProduct, increaseQuantity, totalQuantity } =
  productsInCartSlice.actions;
