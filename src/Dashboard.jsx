import React, { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import HabitCircle from "./HabitCircle/HabitCircle";
import { useNavigate } from "react-router-dom";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const handleCreateHabit = () => {
    navigate("/create-habit");
  };

  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
      }

      const userHabits = await response.json();
      setHabits(userHabits);
      console.log(userHabits);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching habits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (isLoading) {
    return <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {habits.map((habit) => (
            <HabitCircle
              key={habit.id}
              id={habit.id}
              habitName={habit.habit_name}
              icon={habit.icon_url}
              isCompletedToday={habit.completedToday}
            />
          ))}
        </div>
      </div>
      <AuthButton name="Create Habit" onClick={handleCreateHabit} />
      <AuthButton name="Logout" onClick={handleLogout} />
    </>
  );
};

export default Dashboard;
