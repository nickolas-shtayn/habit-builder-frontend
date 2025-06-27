import React, { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import HabitCircle from "./HabitCircle/HabitCircle";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
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
        if (response.status === 401) {
          localStorage.removeItem("jwt");
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch habits");
      }

      const userHabits = await response.json();
      setHabits(userHabits);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <div>Loading your habits...</div>;
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
              habitName={habit.habit_name}
              icon={habit.icon_url}
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
