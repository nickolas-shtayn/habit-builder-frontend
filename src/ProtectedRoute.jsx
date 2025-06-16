import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoading(false);
      return;
    }

    const CheckToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setIsValid(true);
          setIsLoading(false);
        } else {
          setIsValid(false);
          setIsLoading(false);
          localStorage.removeItem("jwt");
        }
      } catch (error) {
        setIsValid(false);
        setIsLoading(false);
      }
    };

    CheckToken();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/unauthorized" replace />;
  return children;
};

export default ProtectedRoute;
