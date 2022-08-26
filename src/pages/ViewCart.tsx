import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { checkOutProduct, totalQuantity } from "../redux/slice/cartSlice";

const ViewCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedProductsToCart = useAppSelector(
    (state) => state.cartSlice.products
  );

  let [productsOfCart, setProductsOfCart] = useState(selectedProductsToCart);

  const handleCheckout = () => {
    navigate("/stock/viewcart/checkout");
  };

  const handleIncreaseQuantity = (id: string, quantity: number) => {
    const index = productsOfCart.findIndex((obj) => obj.id === id);
    setProductsOfCart(
      (productsOfCart = [
        ...productsOfCart.slice(0, index),
        { ...productsOfCart[index], quantity },
        ...productsOfCart.slice(index + 1),
      ])
    );
  };

  const handleDeccreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      const index = productsOfCart.findIndex((obj) => obj.id === id);
      setProductsOfCart(
        (productsOfCart = [
          ...productsOfCart.slice(0, index),
          { ...productsOfCart[index], quantity },
          ...productsOfCart.slice(index + 1),
        ])
      );
    }
  };

  const [totalPrice, setTotalPrice] = useState(
    productsOfCart.map((obj) => Number(obj.price) * obj.quantity)
  );

  const [sum, setSum] = useState(
    totalPrice.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
  );

  useEffect(() => {
    dispatch(totalQuantity(sum));
  }, [totalPrice]);

  useEffect(() => {
    setTotalPrice(
      productsOfCart.map((obj) => Number(obj.price) * obj.quantity)
    );
    setSum(
      totalPrice.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0)
    );

    dispatch(checkOutProduct(productsOfCart));
  }, [productsOfCart]);

  const displaySelectedProduct = productsOfCart.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td className="view-cart__flex">
        <button
          className="btn-inc"
          onClick={() =>
            handleIncreaseQuantity(product.id, product.quantity + 1)
          }
        >
          +
        </button>
        <input
          type="number"
          value={product.quantity}
          className="view-cart__input"
          readOnly
        />
        <button
          className="btn-inc"
          onClick={() =>
            handleDeccreaseQuantity(product.id, product.quantity - 1)
          }
        >
          -
        </button>
      </td>
    </tr>
  ));

  const totalProducts = productsOfCart.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{Number(product.price) * product.quantity}</td>
    </tr>
  ));

  return (
    <div className="view-cart">
      <div className="view-cart-flex">
        <table>
          <tbody>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
            {displaySelectedProduct}
          </tbody>
        </table>

        <div>
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {totalProducts}
            </tbody>
          </table>
          <div className="total-price">
            <p>Total</p>
            <input
              type="number"
              readOnly
              className="total-price-input"
              value={sum}
            />
          </div>
        </div>
      </div>
      <button className="btn--primary checkout" onClick={handleCheckout}>
        <span>Checkout</span>
      </button>
    </div>
  );
};

export default ViewCart;
