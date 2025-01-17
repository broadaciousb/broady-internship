import React, { useEffect, useState } from "react";

const Countdown = ({expiration}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  function convertTime(expDate) {
    if (!expDate) return null;

    const timeLeft = (expDate - currentTime) / 1000;

    if (timeLeft <= 0) return null;

    const hours = Math.floor(timeLeft / 60 / 60);
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {expiration - currentTime >= 0 && (
        <div id="de_countdown" className="de_countdown">
          {convertTime(expiration)}
        </div>
      )}
    </div>
  );
};

export default Countdown;
