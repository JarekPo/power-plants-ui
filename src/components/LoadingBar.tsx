import React, {useEffect, useState} from 'react';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const generateRandomProgress = () => {
      return Math.floor(Math.random() * 30) + 10;
    };

    const generateRandomTime = () => {
      return Math.floor(Math.random() * 300) + 100;
    };

    const updateProgress = () => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + generateRandomProgress();
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    };

    const timer = setInterval(() => {
      updateProgress();
      if (progress >= 100) {
        clearInterval(timer);
      }
    }, generateRandomTime());

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div
      className='flex w-full h-0.5 bg-gray-200 rounded-full overflow-hidden'
      role='progressbar'
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className='flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-200 ease-out'
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
};

export default LoadingBar;
