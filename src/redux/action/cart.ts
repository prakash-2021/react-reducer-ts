import { ADD_TO_CART, CHECK_OUT_PRODUCT, INCREASE_QUANTITY } from "./types";

interface productType {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export const addToCart = (product: productType) => {
  return { type: ADD_TO_CART, product };
};

export const increaseQuantity = (product: productType[]) => {
  return { type: INCREASE_QUANTITY, product };
};

export const checkOutProduct = (product: productType[], total: number) => {
  return { type: CHECK_OUT_PRODUCT, product, total };
};
