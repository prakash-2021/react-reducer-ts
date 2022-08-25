import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";

type productsType = {
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    price: string;
    quantity: number;
  }[];
};

const Order = () => {
  // const orderProduct = useSelector(
  //   (state: {
  //     orderProducts: {
  //       products: productsType[];
  //     };
  //   }) => state.orderProducts.products
  // );

  const orderProduct = useAppSelector((state) => state.orderSlice.products);

  return (
    <div className="orders">
      <div className="order-info">
        {orderProduct &&
          orderProduct.map((obj, idx) => (
            <div key={idx} className="border-1">
              <p>Name: {obj.buyerInfo.name}</p>
              <p>Email: {obj.buyerInfo.email}</p>
              <p>Phone: {obj.buyerInfo.phone}</p>
              <table>
                <tbody>
                  <tr>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Total price (Rs.)</th>
                  </tr>
                  {obj.product.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Order;
