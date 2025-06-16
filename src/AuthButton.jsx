import React from "react";

const AuthButton = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.name}</button>
    </>
  );
};

export default AuthButton;
