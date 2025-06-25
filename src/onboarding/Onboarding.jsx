import React, { useState } from "react";
import Introduction from "./Introduction";
import HabitLoop1 from "./HabitLoop1";
import HabitLoop2 from "./HabitLoop2";
import HabitLoop3 from "./HabitLoop3";
import HabitLoop4 from "./HabitLoop4";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("Introduction");

  const handleHabitComplete = () => {
    setCurrentPage("HabitLoop1");
  };

  const handleNextToHabitLoop2 = () => {
    setCurrentPage("HabitLoop2");
  };

  const handleNextToHabitLoop3 = () => {
    setCurrentPage("HabitLoop3");
  };

  const handleNextToHabitLoop4 = () => {
    setCurrentPage("HabitLoop4");
  };

  const handleOnboarding = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch("http://localhost:3000/users/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const onboarding = data.completed_onboarding;

      if (onboarding) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Introduction":
        return <Introduction onComplete={handleHabitComplete} />;
      case "HabitLoop1":
        return (
          <HabitLoop1
            onSkip={handleOnboarding}
            onNext={handleNextToHabitLoop2}
          />
        );
      case "HabitLoop2":
        return (
          <HabitLoop2
            onSkip={handleOnboarding}
            onNext={handleNextToHabitLoop3}
          />
        );
      case "HabitLoop3":
        return (
          <HabitLoop3
            onSkip={handleOnboarding}
            onNext={handleNextToHabitLoop4}
          />
        );
      case "HabitLoop4":
        return <HabitLoop4 onComplete={handleOnboarding} />;
    }
  };
  return <>{renderPage()}</>;
};

export default Onboarding;
