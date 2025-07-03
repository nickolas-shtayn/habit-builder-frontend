import React, { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import HabitCircle from "./HabitCircle/HabitCircle";
import { useNavigate } from "react-router-dom";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import DatePicker from "./DatePicker";
import Trend from "./Trend.jsx";
import CreateHabitCircle from "./CreateHabitCircle.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentHabitIndex, setCurrentHabitIndex] = useState(0);
  const [trend, setTrend] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [hasHabitsForPreviousDate, setHasHabitsForPreviousDate] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const handleCreateHabit = () => {
    navigate("/create-habit");
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const handleHabitCompletion = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const fetchHabits = async (date = selectedDate) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/dashboard/${date.toISOString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log(response);
      }

      const userHabits = await response.json();
      setHabits(userHabits);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching habits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits(selectedDate);
  }, [selectedDate, refreshTrigger]);

  // Create a combined array with habits and CreateHabitCircle placeholders
  const getDisplayItems = () => {
    const displayItems = [...habits];
    const remainingSlots = 6 - habits.length;

    for (let i = 0; i < remainingSlots; i++) {
      displayItems.push({ type: "create", id: `create-${i}` });
    }

    return displayItems;
  };

  const displayItems = getDisplayItems();

  const goToNextHabit = () => {
    if (currentHabitIndex < displayItems.length - 1) {
      setCurrentHabitIndex(currentHabitIndex + 1);
    }
  };

  const goToPreviousHabit = () => {
    if (currentHabitIndex > 0) {
      setCurrentHabitIndex(currentHabitIndex - 1);
    }
  };

  const fetchTrend = async (date = selectedDate) => {
    if (!habits || habits.length === 0 || currentHabitIndex >= habits.length) {
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/habit/${
          habits[currentHabitIndex].id
        }/trend/${date.toISOString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log(response);
      }

      const habitTrend = await response.json();
      setTrend(habitTrend);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching trend:", err);
    }
  };

  useEffect(() => {
    if (habits.length > 0 && currentHabitIndex < habits.length) {
      fetchTrend(selectedDate);
    }
  }, [selectedDate, habits, currentHabitIndex, refreshTrigger]);

  const checkPreviousDateHabits = async () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() - 1);

    const token = localStorage.getItem("jwt");
    if (!token) {
      setHasHabitsForPreviousDate(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/dashboard/${previousDate.toISOString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const previousHabits = await response.json();
        setHasHabitsForPreviousDate(previousHabits.length > 0);
      } else {
        setHasHabitsForPreviousDate(false);
      }
    } catch (err) {
      setHasHabitsForPreviousDate(false);
    }
  };

  useEffect(() => {
    checkPreviousDateHabits();
  }, [selectedDate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <DatePicker
        selectedDate={selectedDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onTodayClick={handleTodayClick}
        hasHabits={hasHabitsForPreviousDate}
      />
      {isLoading ? (
        <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
      ) : null}
      {displayItems.length > 0 &&
        displayItems[currentHabitIndex] &&
        displayItems[currentHabitIndex].type !== "create" && (
          <Trend
            completions={trend?.completions}
            totalDays={trend?.totalDays}
            trendUp={trend?.trendUp}
          />
        )}
      <div>
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          {currentHabitIndex > 0 && displayItems.length > 0 && (
            <button
              onClick={goToPreviousHabit}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "10px",
                fontSize: "20px",
                minWidth: "50px",
                minHeight: "50px",
                zIndex: 10,
              }}
            >
              ←
            </button>
          )}
          {displayItems.length > 0 &&
            (displayItems[currentHabitIndex].type === "create" ? (
              <CreateHabitCircle
                key={`create-${currentHabitIndex}-${selectedDate.toDateString()}`}
                onClick={handleCreateHabit}
              />
            ) : (
              <HabitCircle
                key={`${
                  displayItems[currentHabitIndex].id
                }-${selectedDate.toDateString()}`}
                id={displayItems[currentHabitIndex].id}
                habitName={displayItems[currentHabitIndex].habit_name}
                icon={displayItems[currentHabitIndex].icon_url}
                isCompletedToday={
                  displayItems[currentHabitIndex].completedToday
                }
                completionDate={selectedDate}
                build={displayItems[currentHabitIndex].build}
                requiredReflection={
                  displayItems[currentHabitIndex].requiredReflection
                }
                onComplete={handleHabitCompletion}
              />
            ))}
          {currentHabitIndex < displayItems.length - 1 && (
            <button
              onClick={goToNextHabit}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "10px",
                fontSize: "20px",
                minWidth: "50px",
                minHeight: "50px",
                zIndex: 10,
              }}
            >
              →
            </button>
          )}
        </div>
      </div>
      <AuthButton name="Create Habit" onClick={handleCreateHabit} />
      <AuthButton name="Logout" onClick={handleLogout} />
    </>
  );
};

export default Dashboard;
