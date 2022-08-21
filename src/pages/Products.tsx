import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Products = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleAddProduct = () => navigate("/product/add");

  const handleEditProduct = (id: number) => {
    navigate(`/product/${id}/edit`);
  };
  const handleViewProduct = (id: number) => {
    navigate(`/product/${id}/view`);
  };
  type tableRowType = {
    id: number;
    name: number;
    price: number;
    quantity: number;
  };
  const tableInfo = useSelector(
    (state: { initializeProduct: { products: [] } }) =>
      state.initializeProduct.products
  );
  const addTableRows = tableInfo
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


  if (tableInfo.length !== 0) {
    localStorage.setItem("storedData", JSON.stringify(tableInfo));
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
