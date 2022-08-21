import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogOut = () => {
    logout();
    navigate("/stock");
  };

  const handleHome = () => navigate("/");
  const handleAbout = () => navigate("/about");
  const handleProduct = () => navigate("/product");
  const handleOrder = () => navigate("/order");

  return (
    <div className="sidebar">
      <p className="Home" onClick={handleHome}>
        Home
      </p>
      <p className="Home" onClick={handleAbout}>
        About
      </p>
      <p className="Home" onClick={handleProduct}>
        Products
      </p>
      <p className="Home" onClick={handleOrder}>
        Order
      </p>
      <p className="Home" onClick={handleLogOut}>
        Log out
      </p>
    </div>
  );
};

export default Sidebar;
