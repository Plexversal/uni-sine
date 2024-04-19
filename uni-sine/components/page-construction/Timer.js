import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const Timer = forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useImperativeHandle(ref, () => ({
    getFormattedTime: () => {
      // This function can now be called from the parent component using the ref
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      }
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },
    getCurrentSeconds: () => seconds // This method returns the current seconds count
  }));

  return <span>{ref.current?.getFormattedTime() || '00:00'}</span>;
});

export default Timer;
