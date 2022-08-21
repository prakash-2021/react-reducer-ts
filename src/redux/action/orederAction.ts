import { ORDER_PRODUCT } from "./types";

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

const orderProduct = (product: productTypes) => {
  return { type: ORDER_PRODUCT, product };
};

export default orderProduct;
