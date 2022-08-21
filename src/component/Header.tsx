import React from "react";
import { useSelector } from "react-redux";

const Header: () => JSX.Element = () => {
  const profile: {
    username: string;
  } = JSON.parse(localStorage.getItem("profile") || "{}");
  return (
    <header className="header">
      <div>hello {profile && profile.username}</div>
    </header>
  );
};
export default Header;
