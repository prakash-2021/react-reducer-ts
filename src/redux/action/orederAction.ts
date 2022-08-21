import { ORDER_PRODUCT } from "./types";

interface productType {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const orderProduct = (product: productType[]) => {
  return { type: ORDER_PRODUCT, product };
};

export default orderProduct;
