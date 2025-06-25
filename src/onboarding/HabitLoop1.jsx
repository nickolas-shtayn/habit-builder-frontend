import React from "react";
import HabitCircle from "../HabitCircle/HabitCircle";
import { Link } from "react-router-dom";

const HabitLoop1 = ({ onNext, onSkip }) => {
  return (
    <>
      <h1>UNDERSTANDING YOUR HABIT</h1>
      <p>
        <span>1</span>THE CUE
      </p>
      <p>
        The cue is the spark that starts your habit - it's the specific signal
        that tells your brain to begin the automatic behavior.
      </p>
      <img
        src="./public/HabitLoop1.svg"
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

export default HabitLoop1;
