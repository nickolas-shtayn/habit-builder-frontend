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
  id,
  // Completion status
  isCompletedToday = false,
  // New prop to disable backend requests
  disableBackend = false,
}) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isComplete, setIsComplete] = useState(isCompletedToday);

  const handlePressStart = () => {
    if (!isComplete) {
      // Only start if not already complete
      setIsExpanding(true);
      if (onPressStart) onPressStart();
    }
  };

  const handleComplete = async () => {
    setIsComplete(true);
    setIsExpanding(false); // Stop expanding when complete

    // Call onComplete callback first (for onboarding flow)
    if (onComplete) {
      onComplete();
    }

    // Only make backend request if not disabled and we have an id
    if (!disableBackend && id) {
      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }

      // POST request for habit completion
      const response = await fetch(
        `http://localhost:3000/habits/${id}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.log(response);
      }
    }
  };

  const handleReset = () => {
    setIsExpanding(false);
    setIsComplete(false);
    if (onReset) onReset();
  };

  const handleUndo = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }

    // POST request for habit undo
    const response = await fetch(
      `http://localhost:3000/habits/${id}/complete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.log(response);
    }

    handleReset();
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
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
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
          />
          <PressHoldCircle
            primaryColor={primaryColor}
            size={size}
            pressDuration={pressDuration}
            onPressStart={handlePressStart}
            onComplete={handleComplete}
            onReset={handleReset}
            isComplete={isComplete}
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
                  WebkitUserDrag: "none",
                }}
              />
            )}
          </div>

          {/* Undo Button */}
          {isComplete && (
            <div
              style={{
                position: "absolute",
                bottom: size * 0.15, // Position inside the circle, below the icon
                left: "50%",
                transform: "translateX(-50%)",
                opacity: isComplete ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 11,
              }}
            >
              <button
                onClick={handleUndo}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#555",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s ease",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#777";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#555";
                }}
              >
                {/* Undo icon from public folder */}
                <img
                  src="/undo.svg"
                  alt="Undo"
                  style={{
                    width: "20px",
                    height: "20px",
                    filter: "brightness(0) invert(1)", // Makes the SVG white
                    userSelect: "none",
                    WebkitUserDrag: "none",
                    pointerEvents: "none",
                  }}
                />
              </button>
            </div>
          )}
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
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          {habitName.toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default HabitCircle;
