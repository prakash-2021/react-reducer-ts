import { useEffect } from "react";
import {
  ADD_TO_CART,
  CHECK_OUT_PRODUCT,
  INCREASE_QUANTITY,
} from "../action/types";

const prevProductsInCart = JSON.parse(
  localStorage.getItem("selectedProduct") || "[]"
);

const initialState: { products: any[]; total: number } = {
  products: prevProductsInCart,
  total: 0,
};

const productsInCart = (
  state = initialState,
  action: {
    type: string;
    product: {
      id: string;
      name: string;
      quantity: number;
    };
    total: number;
    id: string;
  }
) => {
  localStorage.setItem("selectedProduct", JSON.stringify(state.products));
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.product],
      };
    case CHECK_OUT_PRODUCT:
      return {
        ...state,
        products: action.product,
        total: action.total,
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        products: action.product,
      };

    default:
      return state;
  }
};

export default productsInCart;
