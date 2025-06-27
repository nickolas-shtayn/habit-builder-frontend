function ExpansionCircle({ size, expandColor, isExpanding, isComplete }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: expandColor,
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) ${
          isExpanding && !isComplete ? "scale(1)" : "scale(0)"
        }`,
        transition: isExpanding ? "transform 1s ease-out" : "none",
        zIndex: 1,
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export default ExpansionCircle;
