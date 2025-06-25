import React from "react";
import HabitCircle from "../HabitCircle/HabitCircle";
import { Link } from "react-router-dom";

const HabitLoop3 = ({ onNext, onSkip }) => {
  return (
    <>
      <h1>UNDERSTANDING YOUR HABIT</h1>
      <p>
        <span>3</span>THE RESPONSE
      </p>
      <p>
        The response is the actual habit you perform - it's the specific action
        or behavior you take when triggered by the craving.
      </p>
      <img
        src="./public/HabitLoop3.svg"
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
      <button onClick={onNext}>Next</button>
      <span
        className="link"
        onClick={onSkip}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        Skip
      </span>
    </>
  );
};

export default HabitLoop3;
