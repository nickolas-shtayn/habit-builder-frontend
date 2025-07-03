const DatePicker = ({
  selectedDate,
  onPreviousDay,
  onNextDay,
  onTodayClick,
  hasHabits,
}) => {
  const today = new Date();

  return (
    <>
      {hasHabits && <button onClick={onPreviousDay}>previous</button>}
      <span>{selectedDate.toDateString()}</span>
      {selectedDate.toDateString() !== today.toDateString() && (
        <button onClick={onNextDay}>next</button>
      )}
      {selectedDate.toDateString() !== today.toDateString() && (
        <div>
          <button onClick={onTodayClick}>today</button>
        </div>
      )}
    </>
  );
};

export default DatePicker;
