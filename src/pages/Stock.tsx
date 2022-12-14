import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, increaseQuantity } from "../redux/action/cart";
import productsInCart from "../redux/reducers/cartReducer";

type productsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
};

const Stock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => navigate("/login");
  const prevProductsInCart = JSON.parse(
    localStorage.getItem("selectedProduct") || "[]"
  );

  const currentProduct = useSelector(
    (state: {
      productsInCart: {
        products: productsType[];
      };
    }) => state.productsInCart.products
  );

  const selectedProductsToCart = currentProduct;

  const totalNum = JSON.parse(localStorage.getItem("totalQuantity") || "0");
  let [totalQuantity, setTotalQuantity] = useState(totalNum);

  const handleViewCart = () => {
    navigate("/stock/viewcart");
  };

  let quantity = 0;

  const handleAddToCart = (id: string, name: string, price: string) => {
    setTotalQuantity((totalQuantity += 1));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    const index = selectedProductsToCart.findIndex(
      (o: { id: string }) => o.id === id
    );
    quantity =
      selectedProductsToCart[index] === undefined
        ? 1
        : selectedProductsToCart[index].quantity + 1;

    const product = { id, name, price, quantity };

    if (index === -1) {
      dispatch(addToCart(product));
    } else {
      selectedProductsToCart[index].quantity += 1;
      dispatch(increaseQuantity(selectedProductsToCart));
    }
  };

  const availableProducts = useSelector(
    (state: { initializeProduct: { products: [] } }) =>
      state.initializeProduct.products
  );

  const allProducts = availableProducts.map((product: productsType) => (
    <div key={product.id} className="stock__product">
      <img src={product.image} />
      <h4>{product.name}</h4>
      <button
        className="btn--secondary"
        onClick={() => handleAddToCart(product.id, product.name, product.price)}
      >
        <span>Add to cart</span>
      </button>
    </div>
  ));

  // const [sum, setSum] = useState(
  //   selectedProductsToCart.forEach((e)=>e.quantity.reduce((accumulator, value) => {
  //     return accumulator + value;
  //   }, 0)
  // ));

  return (
    <>
      <header className="header">
        <button className="btn--secondary" onClick={handleLogin}>
          Admin Log In
        </button>
        <div className="cart-flex">
          <div className="cart-details">
            <div className="cart-details-flex">
              <>
                {selectedProductsToCart.map((product: productsType) => (
                  <div key={product.id}>
                    <p>Name: {product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
              </>
            </div>
            {totalQuantity && (
              <button className="btn--secondary" onClick={handleViewCart}>
                view cart
              </button>
            )}
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg"
            className="cart-img"
          />
          <p>{totalQuantity}</p>
        </div>
      </header>
      <div className="product__flex">{allProducts}</div>
    </>
  );
};
export default Stock;
