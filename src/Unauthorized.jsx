import React from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <AuthButton name="Login" onClick={handleLoginRedirect} />
    </>
  );
};

export default Unauthorized;
