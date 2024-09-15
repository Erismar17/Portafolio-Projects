import React, { useEffect, useState } from 'react';
import './clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const deg = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hr = time.getHours() * 30;
  const min = time.getMinutes() * deg;
  const sec = time.getSeconds() * deg;

  const formatTime = () => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let period = 'AM';

    if (hours > 12) {
      hours -= 12;
      period = 'PM';
    }

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds} ${period}`;
  };

  return (
      <div className='clock'>
        <div className='digital-clock'>{formatTime()}</div>
        <div className='hour' style={{ transform: `rotate(${hr + min / 12}deg)` }}></div>
        <div className='minute' style={{ transform: `rotate(${min}deg)` }}></div>
        <div className='second' style={{ transform: `rotate(${sec}deg)` }}></div>
    </div>
  );
};
export default Clock;