import PressHoldCircle from "./pressHoldCircle";
import ExpansionCircle from "./ExpansionCircle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HabitCircle = ({
  // Size props
  size = 200,
  // Color props
  primaryColor = "gray",
  expandColor = "#333",
  // Icon props
  icon = null,
  iconSize = "4rem",
  // Text props
  habitName = "HABIT",
  // Timing props
  pressDuration = 1000,
  // Event handlers
  onPressStart,
  onComplete,
  onReset,
  id,
  isCompletedToday = false,
  // New prop to disable backend requests
  disableBackend = false,
  completionDate,
  build = true,
  // New prop for reflection requirement
  requiredReflection = false,
}) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isComplete, setIsComplete] = useState(isCompletedToday);
  const navigate = useNavigate();

  useEffect(() => {
    setIsComplete(isCompletedToday);
  }, [isCompletedToday]);

  // Determine colors based on build prop
  const getColors = () => {
    if (build) {
      return {
        primaryColor,
        expandColor,
      };
    } else {
      return {
        primaryColor: "#ff4444", // Red color for breaking habits
        expandColor: "#cc3333", // Darker red for expansion
      };
    }
  };

  const colors = getColors();

  const handlePressStart = () => {
    if (!isComplete && !requiredReflection) {
      // Only start if not already complete and reflection is not required
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completionDate: completionDate.toISOString(),
          }),
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completionDate: completionDate.toISOString() }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.error);
    }

    handleReset();

    // Call onComplete callback to trigger trend rerender
    if (onComplete) {
      onComplete();
    }
  };

  const handleReflectionClick = () => {
    if (requiredReflection && id) {
      navigate(`/reflection/${id}`);
    }
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
          onClick={requiredReflection ? handleReflectionClick : undefined}
        >
          <ExpansionCircle
            size={size}
            expandColor={colors.expandColor}
            isExpanding={requiredReflection ? false : isExpanding}
            isComplete={isComplete}
          />
          <PressHoldCircle
            primaryColor={colors.primaryColor}
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

          {/* Required Reflection Overlay */}
          {requiredReflection ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
                }}
              >
                Reflection Required
              </div>
            </div>
          ) : null}

          {/* Undo Button */}
          {isComplete && !requiredReflection && (
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
            color: colors.primaryColor,
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
