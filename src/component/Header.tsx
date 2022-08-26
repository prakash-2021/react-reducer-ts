import React from "react";

const Header = () => {
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
