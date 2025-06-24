import React, { useState, useRef } from "react";
import "./PressHoldCircle.css";

const PressHoldCircle = ({
  size,
  primaryColor,
  pressDuration = 1000,
  onPressStart,
  onComplete,
  onReset,
  isComplete: externalIsComplete,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [internalIsComplete, setInternalIsComplete] = useState(false);
  const timerRef = useRef(null);

  const isComplete =
    externalIsComplete !== undefined ? externalIsComplete : internalIsComplete;

  const handlePointerDown = () => {
    setIsPressed(true);
    setInternalIsComplete(false);
    onPressStart();

    timerRef.current = setTimeout(() => {
      setInternalIsComplete(true);
      onComplete();
    }, pressDuration);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    if (!internalIsComplete) {
      clearTimeout(timerRef.current);
      setInternalIsComplete(false);
      onReset();
    }
  };

  const handlePointerLeave = () => {
    setIsPressed(false);
    if (!internalIsComplete) {
      clearTimeout(timerRef.current);
      setInternalIsComplete(false);
      onReset();
    }
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: isPressed && !isComplete ? "scale(0.9)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
      onPointerLeave={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: isComplete ? "#333" : primaryColor,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          animation:
            isPressed && !isComplete ? "vibrate 0.1s infinite" : "none",
        }}
      >
        {/* Icon removed from here */}
      </div>
    </div>
  );
};

export default PressHoldCircle;
