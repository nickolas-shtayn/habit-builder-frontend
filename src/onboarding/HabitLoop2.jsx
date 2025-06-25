import React from "react";
import HabitCircle from "../HabitCircle/HabitCircle";
import { Link } from "react-router-dom";

const HabitLoop2 = ({ onNext, onSkip }) => {
  return (
    <>
      <h1>UNDERSTANDING YOUR HABIT</h1>
      <p>
        <span>2</span>THE CRAVING
      </p>
      <p>
        The craving is the motivational force behind your habit - it's the
        anticipation and desire that drives you to act.
      </p>
      <img
        src="./public/HabitLoop2.svg"
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

export default HabitLoop2;
