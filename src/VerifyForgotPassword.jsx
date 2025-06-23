import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useNavigate, Link } from "react-router-dom";

const VerifyForgotPassword = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationCode = (event) => {
    setVerificationCode(event.target.value);
  };

  const reset = () => {
    setVerificationCode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("verification-email");

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetCode: verificationCode }),
        }
      );
      const data = await response.json();
      localStorage.setItem("resetCode", data.resetCode);
      reset();
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Password reset</h1>
      <p>We'll send you reset instructions</p>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="1"
          label="Verification Code"
          type="number"
          placeholder="1234"
          value={verificationCode}
          onChange={handleVerificationCode}
        />
        <AuthButton name="Continue" />
        <Link to="/login">
          <AuthButton name="Back to login" />
        </Link>
      </form>
    </>
  );
};

export default VerifyForgotPassword;
