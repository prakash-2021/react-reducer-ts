import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const RequireAuth = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile") || "{}") === null) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
