import React from "react";
import HabitCircle from "../HabitCircle/HabitCircle";

const Introduction = ({ onComplete, onSkip }) => {
  return (
    <>
      <h1>HABIT BUILDER</h1>
      <p>Press and hold the habit circle to get started</p>
      <HabitCircle onComplete={onComplete} disableBackend={true} />
      <p>PRESS AND HOLD TO GET STARTED</p>
    </>
  );
};

export default Introduction;
