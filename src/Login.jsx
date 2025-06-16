import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      const onboarding = data.user.completed_onboarding;
      reset();

      if (!onboarding) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
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
          label="Remember Me"
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMe}
        />
        <Link to="/forgotpassword">Forgot Password?</Link>
        <AuthButton type="submit" name="Login" />
        <br></br>
      </form>
      <AuthButton name="Sign up" onClick={handleSignUpRedirect} />
    </>
  );
};

export default Login;
