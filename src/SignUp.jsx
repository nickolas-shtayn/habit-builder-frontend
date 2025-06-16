import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleLoginRedirect = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
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
    } catch (error) {
      console.log(error);
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
          label="Confirm Password"
          type="password"
          placeholder="Your password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <AuthButton type="submit" name="Sign up" />
        <br />
        <AuthButton name="Login" onClick={handleLoginRedirect} />
      </form>
    </>
  );
};

export default SignUp;
