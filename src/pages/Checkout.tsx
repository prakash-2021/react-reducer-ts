import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseQuantity } from "../redux/action/cart";
import { useDispatch } from "react-redux";
import orderProduct from "../redux/action/orederAction";
import { editedProduct, initializeProduct } from "../redux/action/products";

type productsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [stockMessage, setStockMessage] = useState<string[]>([]);

  const selectedProductsToCart = useSelector(
    (state: {
      productsInCart: {
        products: productsType[];
        total: number;
      };
    }) => state.productsInCart.products
  );

  const stockProduct: productsType[] = useSelector(
    (state: { initializeProduct: { products: [] } }) =>
      state.initializeProduct.products
  );

  const totalPrice = useSelector(
    (state: {
      productsInCart: {
        products: productsType[];
        total: number;
      };
    }) => state.productsInCart.total
  );

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleOrder = () => {
    selectedProductsToCart.forEach((cart) => {
      const index = stockProduct.findIndex(
        (stock: productsType) => stock.id === cart.id
      );
      const info = { index, quantity: cart.quantity };
      if (index >= 0) {
        const { name, quantity } = stockProduct[index];

        if (cart.quantity > quantity) {
          setStockMessage((prevMessage) => [...prevMessage, name]);
        } else {
          if (name === "" || phone === "" || !validateEmail(email)) {
            setMessage("please fill your details");
          } else {
            console.log("haha");
            const buyerInfo = { name, email, phone };
            localStorage.setItem("selectedProduct", JSON.stringify([]));
            localStorage.setItem("totalQuantity", JSON.stringify(0));
            dispatch(increaseQuantity([]));
            const totalInformation = {
              buyerInfo,
              product: selectedProductsToCart,
            };

            stockProduct[index].quantity -= cart.quantity;
            dispatch(initializeProduct(stockProduct));

            dispatch(orderProduct(totalInformation));
            navigate("/stock");
            alert("Ordered Successfully");
          }
        }
      }
    });
  };

  // const handleOrder = () => {
  //   selectedProductsToCart.forEach((cart) => {
  //     const index = stockProduct.findIndex(
  //       (stock: productsType) => stock.id === cart.id
  //     );
  //     if (index >= 0) {
  //       const { name, quantity } = stockProduct[index];

  //       if (cart.quantity > quantity) {
  //         setStockMessage((prevMessage) => [...prevMessage, name]);
  //       } else {
  //         const info = { index, quantity: cart.quantity };
  //         // dispatch(updateQuantity(info));
  //       }
  //     }
  //   });
  // };

  return (
    <>
      <div className="checkout-flex">
        <div>
          <h3>PERSONAL DETAILS</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />{" "}
          <br />
          <p className="color-red mt-20">
            <i> {message}</i>
          </p>
        </div>
        <div>
          <h5>Your Bag</h5>
          <div>
            <p>Total</p>
            <p>Rs. {totalPrice}</p>
          </div>
          <h5 className="mt-20">Items</h5>
          <>
            {selectedProductsToCart.map((obj: productsType) => (
              <p key={obj.id}>
                {obj.name} ({obj.quantity}) Rs. {obj.price}
              </p>
            ))}
          </>
        </div>
      </div>
      <button className="btn--primary order" onClick={handleOrder}>
        <span>Order</span>
      </button>
      <p className="color-red text-center">
        <>
          {stockMessage.map((productName, id) => {
            <i key={id}>{productName} is out of stock</i>;
          })}
        </>
      </p>
    </>
  );
};

export default Checkout;
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
