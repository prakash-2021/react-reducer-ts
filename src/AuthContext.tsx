import React, { ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeProduct } from "./redux/action/products";

interface AuthContextInterface {
  login: () => void;
  logout: () => void;
}
const authContextDefault: AuthContextInterface = {
  login: () => false,
  logout: () => false,
};
export const AuthContext =
  createContext<AuthContextInterface>(authContextDefault);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const login = () => localStorage.setItem("isLogin", JSON.stringify(true));

  const logout = () => localStorage.setItem("isLogin", JSON.stringify(false));

  useEffect(() => {
    // setLoggedIn((loggedIn = JSON.parse(localStorage.getItem("isLogin"))));
    let tableInformation = JSON.parse(
      localStorage.getItem("storedData") || "[]"
    );

    if (tableInformation === {}) {
      tableInformation = [];
      dispatch(initializeProduct(tableInformation));
    } else dispatch(initializeProduct(tableInformation));
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
