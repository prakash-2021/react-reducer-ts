import { INITIALIZE_DATA, ADD_PRODUCT, EDIT_PRODUCT, MANAGE_QUANTITY } from "./types";

export const initializeProduct = (products: any) => {
  return { type: INITIALIZE_DATA, products };
};

export const addProuct = (product: any) => {
  return { type: ADD_PRODUCT, product };
};

export const editedProduct = (product: any) => {
  return { type: EDIT_PRODUCT, product };
};

export const manageQuantity = (product: any) => {
  return { type: MANAGE_QUANTITY, product };
};
