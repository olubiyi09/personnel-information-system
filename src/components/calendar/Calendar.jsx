import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ year: initialYear }) => {
  const currentDate = new Date();
  const [year, setYear] = useState(initialYear || currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const isCurrentDate = (day) => {
    return (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() + 1 &&
      year === currentDate.getFullYear()
    );
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h2>{new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h2>
        <div className={styles.select}>
          <div className={styles.selectone}>
            <select value={month} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Date(year, index, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select value={year} onChange={handleYearChange} className="ml-4">
              {Array.from({ length: 10 }, (_, index) => (
                <option key={initialYear + index} value={initialYear + index}>
                  {initialYear + index}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.days}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.day}>{day}</div>
        ))}
      </div>
      <div className={styles.grid}>
        {[...Array(firstDayOfMonth).keys()].map(() => (
          <div key={Math.random()} className={styles.cell}></div>
        ))}
        {days.map(day => (
          <div
            key={day}
            className={`${styles.cell} ${isCurrentDate(day) ? styles.currentDate : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
