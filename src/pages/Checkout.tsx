import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux/store/hooks";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { orderProduct } from "../redux/slice/orderSlice";
import { decreaseQuantity, editProduct } from "../redux/slice/productSlice";
import { checkOutProduct, increaseQuantity } from "../redux/slice/cartSlice";
import { useSelector } from "react-redux";

type productsType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [stockMessage, setStockMessage] = useState("");
  const [isnotEnough, setIsnotEnough] = useState(false);

  const { products: cartProducts, total: totalPrice } = useAppSelector(
    (state) => state.cartSlice
  );

  const stockProduct = useAppSelector((state) => state.productSlice.products);

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  useEffect(() => {
    if (stockMessage !== "") setIsnotEnough(true);
  }, [setStockMessage]);

  const handleOrder = () => {
    // decrease quantity count of above ordered items from stock

    const updatedQuantityProduct = stockProduct.map((obj: productsType) => {
      if (obj.id === cartProducts[0].id) {
        if (obj.quantity < cartProducts[0].quantity) {
          setStockMessage("out of stock");
        } else {
          setStockMessage("");
          const data = { id: obj.id, quantity: cartProducts[0].quantity };
          dispatch(decreaseQuantity(data));
        }
      } else {
        return obj;
      }
    });

    if (!updatedQuantityProduct.includes(undefined)) {
      dispatch(editProduct(updatedQuantityProduct));
    }

    // save new customer order in store

    if (isnotEnough === true) {
      setStockMessage("out of stock");
    } else if (name === "" || phone === "" || !validateEmail(email)) {
      setMessage("please fill your details");
    } else {
      const buyerInfo = { name, email, phone };
      localStorage.setItem("selectedProduct", JSON.stringify([]));
      localStorage.setItem("totalQuantity", JSON.stringify(0));
      dispatch(checkOutProduct([]));
      const totalInformation = {
        buyerInfo,
        product: cartProducts,
      };
      dispatch(orderProduct(totalInformation));
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
            <p>
              Rs. <>{totalPrice}</>
            </p>
          </div>
          <h5 className="mt-20">Items</h5>
          <>
            {cartProducts.map((obj: productsType) => (
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
        <i>{stockMessage}</i>
      </p>
    </>
  );
};

export default Checkout;
