import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const Login = () => {
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

      reset();
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
        {/* needs to be hooked up once routing is a thing */}
        <a href="">Forgot Password?</a>
        {/* needs to be hooked up once routing is a thing */}
        <AuthButton type="submit" name="Login" />
        <br></br>
        {/* needs to be hooked up once routing is a thing */}
        <AuthButton name="Sign up" />
      </form>
    </>
  );
};

export default Login;
