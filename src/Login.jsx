import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        />
        <AuthInput
          id="2"
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={handlePassword}
        />
        <AuthInput
          id="3"
          label="Remember Me"
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMe}
        />
        <Link to="/forgot-password">Forgot Password?</Link>
        <AuthButton type="submit" name="Login" />
        <br></br>
      </form>
      <Link to="/signup">
        <AuthButton name="Sign up" />
      </Link>
    </>
  );
};

export default Login;
