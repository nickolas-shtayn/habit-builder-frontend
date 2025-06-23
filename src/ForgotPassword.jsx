import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const reset = () => {
    setEmail("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.length === 0) {
      return "nice popa :)";
    }

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      reset();

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("verification-email", data.email);
        navigate("/forgot-password-verify");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Forgot password?</h1>
      <p>We'll send you reset instructions</p>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="1"
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmail}
        />
        <AuthButton name="Reset password" />
      </form>
      <Link to="/login">
        <AuthButton name="Back to login" />
      </Link>
    </>
  );
};

export default ForgotPassword;
