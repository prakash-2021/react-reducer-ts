import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const initialState: { products: ProductsType[] } = {
  products: [],
};

const initializeProductSlice = createSlice({
  name: "initializeProduct",
  initialState,
  reducers: {
    initializeProduct: (state, action: PayloadAction<ProductsType[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductsType>) => {
      state.products = [...state.products, action.payload];
    },
    editProduct: (state, action: PayloadAction<ProductsType>) => {
      const index = state.products.findIndex(
        (obj: { id: string }) => obj.id === action.payload.id
      );
      state.products[index] = action.payload;
      state.products = state.products;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      state.products[action.payload.index].quantity -= action.payload.quantity;
    },
  },
});

export default initializeProductSlice.reducer;
export const { initializeProduct, addProduct, editProduct, updateQuantity } =
  initializeProductSlice.actions;
