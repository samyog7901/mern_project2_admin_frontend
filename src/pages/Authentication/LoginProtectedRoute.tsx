import React from "react";
// import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface Props {
  children: React.ReactNode;
}

const LoginProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const isLoggedIn = Boolean(user || (token && token.trim() !== ""));

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default LoginProtectedRoute;
