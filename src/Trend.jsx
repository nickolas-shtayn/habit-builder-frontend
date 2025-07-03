import React from "react";

const Trend = ({ completions = 0, trendUp = null, totalDays = 7 }) => {
  const percent = Math.round((completions / totalDays) * 100);

  let trendIcon;
  if (trendUp === true) trendIcon = "/upTrend.svg";
  else if (trendUp === false) trendIcon = "/downTrend.svg";
  else trendIcon = "/defaultTrend.svg";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#ddd",
        borderRadius: "2em",
        padding: "0.2em 0.7em",
        fontWeight: 600,
        fontSize: "1em",
        color: "#222",
        gap: "0.3em",
      }}
    >
      <span>
        {completions}/{totalDays} ({percent}%)
      </span>
      <img
        src={trendIcon}
        alt="trend indicator"
        style={{
          width: "18px",
          height: "18px",
          verticalAlign: "middle",
        }}
      />
    </div>
  );
};

export default Trend;
