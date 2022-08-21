import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const ViewProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const products = useSelector(
    (state: any) => state.initializeProduct.products
  );

  type Product = {
    name: string;
    quantity: string;
    price: string;
    image: string;
  };

  const [productsProperty, setProductsProperty] = useState<Product | null>(
    null
  );
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      const foundProperty = products.find(
        (obj: any) => obj.id.toString() === id
      );
      setProductsProperty(foundProperty);
    }
  }, [id, products]);

  useEffect(() => {
    if (productsProperty) {
      setName(productsProperty.name);
      setQuantity(productsProperty.quantity);
      setPrice(productsProperty.price);
      setImage(productsProperty.image);
    }
  }, [productsProperty]);

  const handleGoBack = () => {
    navigate("/product");
  };

  if (productsProperty === undefined) {
    return <p>Product not found</p>;
  }

  return (
    <div className="add-product">
      <div className="add-flex">
        <p>ID</p>
        <p>{id}</p>
      </div>
      <div className="add-flex">
        <p>Name</p>
        <input className="" type="text" value={name} readOnly />
      </div>
      <div className="add-flex">
        <p>Price</p>
        <input type="number" value={price} readOnly />
      </div>
      <div className="add-flex">
        <p>Quantity</p>
        <input type="number" value={quantity} readOnly />
      </div>
      <div className="add-flex">
        <p>Image</p>
        <img src={image} alt="" />
      </div>
      <button className="btn--primary add" onClick={handleGoBack}>
        <span>Go back</span>
      </button>
    </div>
  );
};

export default ViewProduct;
