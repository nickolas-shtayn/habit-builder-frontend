import React from "react";

const size = 200; // Match HabitCircle default

const CreateHabitCircle = ({ onClick }) => {
  return (
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
        <div
          onClick={onClick}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "#D8D8D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              width: size * 0.5, // Length of the plus
              height: size * 0.5, // Height of the plus
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                width: size * 0.05, // Thickness of the lines
                height: "100%",
                backgroundColor: "#fff",
              }}
            />
            {/* Horizontal line */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: size * 0.05, // Thickness of the lines
                backgroundColor: "#fff",
              }}
            />
          </div>
        </div>
      </div>

      {/* Habit Name */}
      <div
        style={{
          marginTop: "1rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#D8D8D8",
          textAlign: "center",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        CREATE NEW HABIT
      </div>
    </div>
  );
};

export default CreateHabitCircle;
