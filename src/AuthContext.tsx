import React, { ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { initializeProduct } from "./redux/slice/productSlice";
import { useAppDispatch } from "./redux/store/hooks";

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
  const dispatch = useAppDispatch();

  const login = () => localStorage.setItem("isLogin", JSON.stringify(true));

  const logout = () => localStorage.setItem("isLogin", JSON.stringify(false));

  useEffect(() => {
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
