import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

type productsType = {
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    price: string;
    quantity: number;
  }[];
};

type tableRowType = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const Products = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleAddProduct = () => navigate("/product/add");

  const handleEditProduct = (id: string) => {
    navigate(`/product/${id}/edit`);
  };

  const handleViewProduct = (id: string) => {
    navigate(`/product/${id}/view`);
  };

  // stock ma vako array of object
  const stockProduct = useSelector(
    (state: { initializeProduct: { products: [] } }) =>
      state.initializeProduct.products
  );

  // order gareko array of object
  const orderProduct = useSelector(
    (state: {
      orderProducts: {
        products: productsType[];
      };
    }) => state.orderProducts.products
  );
  // console.log("orderProduct ->", orderProduct);

  // const index: number;
  // const updatedQuantityProducts = orderProduct.map((obj) =>
  //   obj.product.map((object) => {
  //     stockProduct.filter((prod: tableRowType) => prod.id === object.id);
  //   })
  // );

  // const 

  // console.log("updatedQuantiy ->", updatedQuantityProducts);

  const addTableRows = stockProduct
    .filter((value: any) => {
      return value.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
    })
    .map((tableRow: tableRowType) => (
      <tr key={tableRow.id}>
        <td>{tableRow.id}</td>
        <td>{tableRow.name}</td>
        <td>{tableRow.price}</td>
        <td>{tableRow.quantity}</td>
        <td className="flex-btn">
          <button
            className="btn--secondary"
            onClick={() => handleEditProduct(tableRow.id)}
          >
            edit
          </button>
          <button
            className="btn--secondary"
            onClick={() => handleViewProduct(tableRow.id)}
          >
            view
          </button>
        </td>
      </tr>
    ));

  if (stockProduct.length !== 0) {
    localStorage.setItem("storedData", JSON.stringify(stockProduct));
  }

  return (
    <div className="products">
      <input
        type="text"
        placeholder="Search.."
        className="search-bar"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="products-flex">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Others</th>
            </tr>
            {addTableRows}
          </tbody>
        </table>

        <button className="btn--primary add" onClick={handleAddProduct}>
          <span>ADD</span>
        </button>
      </div>
    </div>
  );
};

export default Products;
