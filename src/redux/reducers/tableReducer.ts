import {
  INITIALIZE_DATA,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  MANAGE_QUANTITY,
} from "../action/types";

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
    case MANAGE_QUANTITY:
      return {
        ...state,
        products: [...state.products, action.product],
      };
    default:
      return state;
  }
};

export default initializeProduct;
