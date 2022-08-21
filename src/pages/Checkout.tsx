import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseQuantity } from "../redux/action/cart";
import { useDispatch } from "react-redux";
import orderProduct from "../redux/action/orederAction";

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

  const selectedProductsToCart = useSelector(
    (state: {
      productsInCart: {
        products: productsType[];
        total: number;
      };
    }) => state.productsInCart.products
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
    if (name === "" || phone === "" || !validateEmail(email)) {
      setMessage("please fill your details");
    } else {
      const buyerInfo = { name, email, phone };
      localStorage.setItem("buyerInfo", JSON.stringify(buyerInfo));
      localStorage.setItem("selectedProduct", JSON.stringify([]));
      localStorage.setItem("totalQuantity", JSON.stringify(0));
      dispatch(increaseQuantity([]));
      dispatch(orderProduct(selectedProductsToCart));
      navigate("/stock");
      alert("Ordered Successfully");
    }
  };

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
    </>
  );
};

export default Checkout;
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
