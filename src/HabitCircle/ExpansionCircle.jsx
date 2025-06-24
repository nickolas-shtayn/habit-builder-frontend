function ExpansionCircle({
  size,
  expandColor,
  isExpanding,
  onReset,
  isComplete,
}) {
  const handleTransitionEnd = () => {
    if (isExpanding && onReset) {
      // Call reset after expansion animation completes
      setTimeout(() => onReset(), 1000); // Match the transition duration
    }
  };

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
          isExpanding ? "scale(1)" : "scale(0)"
        }`,
        transition: isExpanding ? "transform 1s ease-out" : "none",
        zIndex: 1,
        pointerEvents: isComplete ? "none" : "auto",
        visibility: isComplete ? "hidden" : "visible",
      }}
      onTransitionEnd={handleTransitionEnd}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  );
}

export default ExpansionCircle;
