import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useNavigate, Link } from "react-router-dom";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateEmail = (value) => {
    if (!value) {
      return "Email required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }

    return "";
  };

  const handleEmailBlur = () => {
    const errorMessage = validateEmail(email);
    setEmailError(errorMessage);
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

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordConfirmation(confirmPassword);

    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      reset();
      navigate("/onboarding");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="1"
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={handleEmail}
          onBlur={handleEmailBlur}
        />
        {emailError && <span>{emailError}</span>}
        <AuthInput
          id="2"
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={handlePassword}
          onBlur={handlePasswordBlur}
        />
        {passwordError && <span>{passwordError}</span>}
        <AuthInput
          id="3"
          label="Confirm Password"
          type="password"
          placeholder="Your password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          onBlur={handlePasswordConfirmationBlur}
        />
        {confirmPasswordError && <span>{confirmPasswordError}</span>}
        <AuthButton type="submit" name="Sign up" />
        <br />
      </form>
      {isLoading ? (
        <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
      ) : null}
      <Link to="/login">
        <AuthButton name="Login" />
      </Link>
    </>
  );
};

export default SignUp;
