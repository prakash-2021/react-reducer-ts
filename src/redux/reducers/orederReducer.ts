import { ORDER_PRODUCT } from "../action/types";

const prevProductsInCart = JSON.parse(
  localStorage.getItem("orderProduct") || "[]"
);

const initialState: { products: any[] } = {
  products: prevProductsInCart,
};

const orderProducts = (
  state = initialState,
  action: {
    type: string;
    product: {
      id: string;
      name: string;
      price: string;
      quantity: number;
    };
  }
) => {
  localStorage.setItem("orderProduct", JSON.stringify(state.products));
  switch (action.type) {
    case ORDER_PRODUCT:
      return {
        ...state,
        products: [state.products, action.product],
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderProducts;
