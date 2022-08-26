import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile") || "[]").length === 0) {
      navigate("/login");
    } else if (
      JSON.parse(localStorage.getItem("isLogin") || "[]") === false ||
      JSON.parse(localStorage.getItem("isLogin") || "[]").length === 0
    ) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
