import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/slice/productSlice";

const AddProducts = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (
      id === "" ||
      name === "" ||
      price === "" ||
      quantity === 0 ||
      image === ""
    ) {
      setMessage("please input all field properly");
    } else {
      const newTableData = { id, name, price, quantity, image };
      dispatch(addProduct(newTableData));
      navigate("/product");
    }
  };

  const handleAddId = () => {
    setId(new Date().valueOf().toString());
  };

  return (
    <div className="add-product">
      <div className="add-flex">
        <p>ID</p>
        <button className="btn--secondary" onClick={handleAddId}>
          <span>Generate</span>
        </button>
        <p>{id}</p>
      </div>
      <div className="add-flex">
        <p>Name</p>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="add-flex">
        <p>Price</p>
        <input type="number" onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="add-flex">
        <p>Quantity</p>
        <input
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div className="add-flex">
        <p>Image</p>
        <input type="text" onChange={(e) => setImage(e.target.value)} />
      </div>
      <button className="btn--primary add" onClick={handleAdd}>
        <span>Save</span>
      </button>

      <p className="color-red">
        <i>{message}</i>
      </p>
      <img src={image} alt="" />
    </div>
  );
};

export default AddProducts;
