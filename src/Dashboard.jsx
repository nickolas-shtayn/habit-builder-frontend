import React from "react";
import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <AuthButton name="Logout" onClick={handleLogout} />
    </>
  );
};

export default Dashboard;
