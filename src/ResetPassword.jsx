import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useNavigate, Link } from "react-router-dom";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const reset = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }

    if (value.length < 8) {
      return "Password is too short";
    }
    return "";
  };

  const handlePasswordBlur = () => {
    const errorMessage = validatePassword(password);
    setPasswordError(errorMessage);
  };

  const validatePasswordConfirmation = (value) => {
    if (!value) {
      return "Password confirmation required";
    }

    if (value !== password) {
      return "Passwords don't match";
    }

    return "";
  };

  const handlePasswordConfirmationBlur = () => {
    const errorMessage = validatePasswordConfirmation(confirmPassword);
    setConfirmPasswordError(errorMessage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetCode = localStorage.getItem("resetCode");
    const email = localStorage.getItem("verification-email");

    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordConfirmation(confirmPassword);

    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (passwordError || confirmPasswordError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetCode, password }),
        }
      );
      const data = await response.json();
      reset();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Set new password</h1>
      <p>Please pick your new password</p>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Password"
          id="1"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={handlePassword}
          onBlur={handlePasswordBlur}
        />
        {passwordError && <span>{passwordError}</span>}
        <AuthInput
          label="Confirm password"
          id="2"
          type="password"
          placeholder="Your password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          onBlur={handlePasswordConfirmationBlur}
        />
        {confirmPasswordError && <span>{confirmPasswordError}</span>}
        <AuthButton type="submit" name="Reset password" />
      </form>
      {isLoading ? (
        <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
      ) : null}
      <Link to="/login">
        <AuthButton name="Back to login" />
      </Link>
    </>
  );
};

export default ResetPassword;
