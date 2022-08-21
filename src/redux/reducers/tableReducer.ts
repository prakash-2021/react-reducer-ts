import { INITIALIZE_DATA, ADD_PRODUCT, EDIT_PRODUCT } from "../action/types";

const initialState: { products: any[] } = {
  products: [],
};

const initializeProduct = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZE_DATA:
      return {
        ...state,
        products: action.products,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };

    case EDIT_PRODUCT:
      const index = state.products.findIndex(
        (obj: any) => obj.id.toString() === action.product.id
      );
      state.products[index] = action.product;
      return {
        ...state,
        products: [...state.products],
      };
    default:
      return state;
  }
};

export default initializeProduct;
