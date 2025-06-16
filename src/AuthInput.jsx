import React from "react";

const AuthInput = (props) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
    </>
  );
};

export default AuthInput;
