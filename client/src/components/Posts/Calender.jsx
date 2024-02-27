import React, { useState } from 'react';
import './calendar.css';


const Calendar = () => {
  // Get current date
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to generate days of the month
  const generateDaysOfMonth = () => {
    const days = [];
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Add blank cells for preceding days
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      days.push(
        <div key={day} className={`calendar-day ${date.getMonth() !== selectedDate.getMonth() ? 'other-month' : ''}`} onClick={() => handleDateClick(date)}>
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>{'<'}</button>
        <div className="month-year">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>{'>'}</button>
      </div>
      <div className="calendar-grid">
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">{generateDaysOfMonth()}</div>
      </div>
    </div>
  );
};

export default Calendar;