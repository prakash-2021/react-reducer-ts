import "./App.css";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Sidebar from "./component/Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import NoMatch from "./component/NoMatch";
import { RequireAuth } from "./component/RequireAuth";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import EditProduct from "./pages/EditProduct";
import ViewProduct from "./pages/ViewProduct";
import Stock from "./pages/Stock";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Header />
            <div className="flex ">
              <Sidebar />
              <Outlet />
            </div>
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Products />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product/add" element={<AddProducts />} />
        <Route path="/product/:id/edit" element={<EditProduct />} />
        <Route path="/product/:id/view" element={<ViewProduct />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/stock" element={<Stock />} />
      <Route path="/stock/viewcart" element={<ViewCart />} />
      <Route path="/stock/viewcart/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
