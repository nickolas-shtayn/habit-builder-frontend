import PressHoldCircle from "./pressHoldCircle";
import ExpansionCircle from "./ExpansionCircle";
import { useState } from "react";

const HabitCircle = ({
  // Size props
  size = 200,

  // Color props
  primaryColor = "gray",
  expandColor = "#333",

  // Icon props
  icon = null,
  iconSize = "2rem",

  // Text props
  habitName = "HABIT",

  // Timing props
  pressDuration = 1000,

  // Event handlers
  onPressStart,
  onComplete,
  onReset,
}) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePressStart = () => {
    setIsExpanding(true);
    setIsComplete(false);
    if (onPressStart) onPressStart();
  };

  const handleComplete = () => {
    setIsComplete(true);
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    setIsExpanding(false);
    setIsComplete(false);
    if (onReset) onReset();
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExpansionCircle
            size={size}
            expandColor={expandColor}
            isExpanding={isExpanding}
            isComplete={isComplete}
            onReset={handleReset}
          />
          <PressHoldCircle
            primaryColor={primaryColor}
            size={size}
            pressDuration={pressDuration}
            onPressStart={handlePressStart}
            onComplete={handleComplete}
            onReset={handleReset}
          />
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {icon && (
              <img
                src={icon}
                alt="Habit Icon"
                style={{
                  width: iconSize,
                  height: iconSize,
                  filter: "brightness(0) invert(1)", // Makes the SVG white
                  userSelect: "none",
                }}
              />
            )}
          </div>
        </div>

        {/* Habit Name */}
        <div
          style={{
            marginTop: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: primaryColor,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          {habitName.toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default HabitCircle;
