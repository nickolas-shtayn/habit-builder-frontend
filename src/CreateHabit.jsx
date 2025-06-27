import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

const CreateHabit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [reflectionFail, setReflectionFail] = useState("");
  const [cue, setCue] = useState("");
  const [craving, setCraving] = useState("");
  const [response, setResponse] = useState("");
  const [reward, setReward] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleIconUrl = (event) => {
    setIconUrl(event.target.value);
  };

  const handleReflectionFail = (event) => {
    setReflectionFail(event.target.value);
  };

  const handleCue = (event) => {
    setCue(event.target.value);
  };

  const handleCraving = (event) => {
    setCraving(event.target.value);
  };

  const handleResponse = (event) => {
    setResponse(event.target.value);
  };

  const handleReward = (event) => {
    setReward(event.target.value);
  };

  const reset = () => {
    setName("");
    setIconUrl("");
    setReflectionFail("");
    setCue("");
    setCraving("");
    setResponse("");
    setReward("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      const fetchResponse = await fetch("http://localhost:3000/habits/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          iconUrl: iconUrl,
          failReflectionLimit: parseInt(reflectionFail),
          cue,
          craving,
          response,
          reward,
        }),
      });

      if (fetchResponse.ok) {
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create New Habit</h1>
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="1"
          label="Habit Name"
          type="text"
          placeholder="Enter habit name"
          value={name}
          onChange={handleName}
        />
        <AuthInput
          id="2"
          label="Icon URL"
          type="text"
          placeholder="Enter icon URL"
          value={iconUrl}
          onChange={handleIconUrl}
        />
        <AuthInput
          id="3"
          label="Reflection Fail Number"
          type="number"
          placeholder="Enter number"
          value={reflectionFail}
          onChange={handleReflectionFail}
        />
        <AuthInput
          id="4"
          label="Cue"
          type="text"
          placeholder="What triggers this habit?"
          value={cue}
          onChange={handleCue}
        />
        <AuthInput
          id="5"
          label="Craving"
          type="text"
          placeholder="What do you want?"
          value={craving}
          onChange={handleCraving}
        />
        <AuthInput
          id="6"
          label="Response"
          type="text"
          placeholder="What will you do?"
          value={response}
          onChange={handleResponse}
        />
        <AuthInput
          id="7"
          label="Reward"
          type="text"
          placeholder="What will you get?"
          value={reward}
          onChange={handleReward}
        />
        <AuthButton type="submit" name="Create Habit" />
      </form>
    </>
  );
};

export default CreateHabit;
