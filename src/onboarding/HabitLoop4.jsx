import React from "react";
import HabitCircle from "../HabitCircle/HabitCircle";

const HabitLoop4 = ({ onComplete }) => {
  return (
    <>
      <h1>UNDERSTANDING YOUR HABIT</h1>
      <p>
        <span>4</span>THE REWARD
      </p>
      <p>
        The reward is the satisfying outcome that completes your habit - it's
        the benefit your brain recieves that makes it want to repeat the
        behavior again.
      </p>
      <img
        src="./public/HabitLoop4.svg"
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
      <button onClick={onComplete}>Complete</button>
    </>
  );
};

export default HabitLoop4;
