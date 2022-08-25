import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { products: any[] } = {
  products: [],
};

const initializeProductSlice = createSlice({
  name: "initializeProduct",
  initialState,
  reducers: {
    initializeProduct: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<any>) => {
      state.products = [...state.products, action.payload];
    },
    editProduct: (state, action: PayloadAction<any>) => {
      const index = state.products.findIndex(
        (obj: { id: string }) => obj.id === action.payload.id
      );
      state.products[index] = action.payload;
      state.products = state.products;
    },
  },
});

export default initializeProductSlice.reducer;
export const { initializeProduct, addProduct, editProduct } =
  initializeProductSlice.actions;
