import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]); // ✅ only token here

  if (!token) return null; // prevent component flashing

  return children;
};

export default ProtectedRoute;
