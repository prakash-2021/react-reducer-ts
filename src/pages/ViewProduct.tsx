import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../redux/store/hooks";

const ViewProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const products = useAppSelector((state) => state.productSlice.products);

  type Product = {
    id: string;
    name: string;
    quantity: number;
    price: string;
    image?: string;
  };

  const [productsProperty, setProductsProperty] = useState<
    Product | null | undefined
  >(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      const foundProperty = products.find((obj) => obj.id.toString() === id);
      setProductsProperty(foundProperty);
    }
  }, [id, products]);

  useEffect(() => {
    if (productsProperty) {
      setName(productsProperty.name);
      setQuantity(productsProperty.quantity.toString());
      setPrice(productsProperty.price);
      setImage(productsProperty?.image ?? "");
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
