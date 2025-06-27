import React, { useState, useRef, useEffect } from "react";
import "./PressHoldCircle.css";

const PressHoldCircle = ({
  size,
  primaryColor,
  pressDuration = 1000,
  onPressStart,
  onComplete,
  onReset,
  isComplete,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef(null);

  // Clear timer on unmount or when isComplete changes
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handlePointerDown = () => {
    if (isComplete) return; // Prevent interaction when complete

    setIsPressed(true);
    onPressStart();

    timerRef.current = setTimeout(() => {
      setIsPressed(false);
      onComplete();
    }, pressDuration);
  };

  const handlePointerUp = () => {
    if (isComplete) return; // Prevent interaction when complete

    setIsPressed(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      onReset();
    }
  };

  const handlePointerLeave = () => {
    if (isComplete) return; // Prevent interaction when complete

    setIsPressed(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
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
        cursor: isComplete ? "default" : "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        touchAction: "none",
      }}
      onPointerLeave={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchEnd={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
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
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          animation:
            isPressed && !isComplete ? "vibrate 0.1s infinite" : "none",
          transition: "background-color 0.3s ease",
        }}
      />
    </div>
  );
};

export default PressHoldCircle;
