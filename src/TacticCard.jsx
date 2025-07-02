import React from "react";

const TacticCard = ({ id, name, icon, description, selected, onToggle }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      background: "#eee",
      borderRadius: "16px",
      padding: "10px 16px",
      margin: "8px 0",
      minWidth: "220px",
      maxWidth: "350px",
      boxShadow: "0 1px 4px #ddd",
    }}
  >
    <img
      src={icon}
      alt={name}
      style={{ width: 28, height: 28, marginRight: 12, opacity: 0.7 }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: 15, color: "#555" }}>{name}</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
        {description}
      </div>
    </div>
    <button
      type="button"
      style={{
        marginLeft: 12,
        background: selected ? "#e57373" : "#90caf9",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "4px 14px",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        minWidth: 60,
      }}
      onClick={() => onToggle(id)}
    >
      {selected ? "REMOVE" : "ADD"}
    </button>
  </div>
);

export default TacticCard;
