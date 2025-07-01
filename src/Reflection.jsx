import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const Reflection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [experience, setExperience] = useState("");
  const [reflection, setReflection] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [experiment, setExperiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bottleneckOptions = [
    {
      key: "cue",
      label: "CUE",
      description: "I don't notice the trigger",
    },
    {
      key: "craving",
      label: "CRAVING",
      description: "I don't have enough motivation to act",
    },
    {
      key: "response",
      label: "RESPONSE",
      description: "The action is too hard",
    },
    {
      key: "reward",
      label: "REWARD",
      description: "I don't enjoy the reward",
    },
  ];

  const handleExprience = (event) => {
    setExperience(event.target.value);
  };

  const handleReflection = (event) => {
    setReflection(event.target.value);
  };

  const handleExperiment = (event) => {
    setExperiment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(
        "http://localhost:3000/habit/reflection/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experience,
            reflection,
            bottleneck,
            experiment,
            habitId: id,
          }),
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="Describe what happened during the days you missed this habit"
        value={experience}
        onChange={handleExprience}
        required={true}
        type="textarea"
      />

      <AuthInput
        label="What do you notice was common across the times you missed?"
        value={reflection}
        onChange={handleReflection}
        required={true}
        type="textarea"
      />

      <div style={{ margin: "2rem 0", textAlign: "center" }}>
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "#ddd",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
            margin: "0 auto",
            boxShadow: "0 0 16px #ccc",
            position: "relative",
          }}
        >
          {/* REWARD*/}
          <button
            type="button"
            onClick={() => setBottleneck("reward")}
            style={{
              background: bottleneck === "reward" ? "#222" : "transparent",
              color: bottleneck === "reward" ? "#fff" : "#888",
              fontWeight: "bold",
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "0 32px 32px 0",
              boxSizing: "border-box",
            }}
          >
            REWARD
          </button>
          {/* CUE */}
          <button
            type="button"
            onClick={() => setBottleneck("cue")}
            style={{
              background: bottleneck === "cue" ? "#222" : "transparent",
              color: bottleneck === "cue" ? "#fff" : "#888",
              fontWeight: "bold",
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              padding: "0 0 32px 32px",
              boxSizing: "border-box",
            }}
          >
            CUE
          </button>
          {/* RESPONSE */}
          <button
            type="button"
            onClick={() => setBottleneck("response")}
            style={{
              background: bottleneck === "response" ? "#222" : "transparent",
              color: bottleneck === "response" ? "#fff" : "#888",
              fontWeight: "bold",
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "32px 32px 0 0",
              boxSizing: "border-box",
            }}
          >
            RESPONSE
          </button>
          {/* CRAVING */}
          <button
            type="button"
            onClick={() => setBottleneck("craving")}
            style={{
              background: bottleneck === "craving" ? "#222" : "transparent",
              color: bottleneck === "craving" ? "#fff" : "#888",
              fontWeight: "bold",
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "32px 0 0 32px",
              boxSizing: "border-box",
            }}
          >
            CRAVING
          </button>
        </div>
        {bottleneck && (
          <div style={{ fontWeight: "bold", marginTop: 24, fontSize: 20 }}>
            {
              bottleneckOptions.find((opt) => opt.key === bottleneck)
                ?.description
            }
          </div>
        )}
      </div>
      <AuthInput
        label="Design the fix. What will you do different moving forward?"
        value={experiment}
        onChange={handleExperiment}
        required={true}
        type="textarea"
      />

      <AuthButton name="Submit" type="submit" />
      {isLoading ? (
        <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
      ) : null}
    </form>
  );
};

export default Reflection;
