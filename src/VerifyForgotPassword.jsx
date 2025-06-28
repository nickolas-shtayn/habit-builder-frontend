import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useNavigate, Link } from "react-router-dom";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const VerifyForgotPassword = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerificationCode = (event) => {
    setVerificationCode(event.target.value);
  };

  const reset = () => {
    setVerificationCode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
        ) : null}
      </form>
    </>
  );
};

export default VerifyForgotPassword;
