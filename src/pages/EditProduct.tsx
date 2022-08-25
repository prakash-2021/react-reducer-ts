import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { editProduct } from "../redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // const products = useSelector(
  //   (state: { initializeProduct: { products: any } }) =>
  //     state.initializeProduct.products
  // );

  const products = useAppSelector(state=>state.productSlice.products)

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
        (obj: { id: number }) => obj.id.toString() === id
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

  const handleEdited = () => {
    const editedProduct = { id, name, quantity, price, image };
    dispatch(editProduct(editedProduct));
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
        <input
          className=""
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="add-flex">
        <p>Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              e.target.value = "0";
            } else setPrice(e.target.value);
          }}
        />
      </div>
      <div className="add-flex">
        <p>Quantity</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              e.target.value = "0";
            } else setQuantity(e.target.value);
          }}
        />
      </div>
      <div className="add-flex">
        <p>Image</p>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <button className="btn--primary add" onClick={handleEdited}>
        <span>Save</span>
      </button>
    </div>
  );
};

export default EditProduct;
