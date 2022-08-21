import React, { useState } from "react";
import { useSelector } from "react-redux";

type productsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const Order = () => {
  const buyer: { name: string; email: string; phone: string } = JSON.parse(
    localStorage.getItem("buyerInfo") || "{}"
  );

  const orderProduct = useSelector(
    (state: {
      orderProducts: {
        products: productsType[];
      };
    }) => state.orderProducts.products
  );

  console.log(orderProduct)

  return (
    <div className="orders">
      <div className="order-info">
        {/* <p>Name: {buyer.name}</p>
        <p>Email: {buyer.email}</p>
        <p>Phone: {buyer.phone}</p> */}
        <table>
          <tbody>
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total price (Rs.)</th>
            </tr>
            {orderProduct.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
