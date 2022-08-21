import { ORDER_PRODUCT } from "../action/types";

const prevProductsInCart = JSON.parse(
  localStorage.getItem("orderProduct") || "[]"
);

interface productType {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface productTypes {
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  product: productType[];
}

const initialState: { products: any[] } = {
  products: prevProductsInCart,
};

const orderProducts = (
  state = initialState,
  action: { type: string; product: productTypes }
) => {
  localStorage.setItem("orderProduct", JSON.stringify(state.products));
  switch (action.type) {
    case ORDER_PRODUCT:
      if (state.products === undefined) {
        return {
          ...state,
          products: [action.product],
        };
      } else {
        localStorage.setItem("orderProduct", JSON.stringify(state.products));
        return {
          ...state,
          products: [...state.products, action.product],
        };
      }

    default:
      return {
        ...state,
      };
  }
};

export default orderProducts;
