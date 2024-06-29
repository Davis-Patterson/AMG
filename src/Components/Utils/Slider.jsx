import React, { useState, useEffect, useRef } from 'react';
import 'styles/Utils/Slider.css';

function Slider({ onChange, progress, type }) {
  const [position, setPosition] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();

  const updateProgress = () => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const progressBarMaxWidth = rangeWidth - thumbWidth;

    const calculatedPosition =
      (progressBarMaxWidth * progress) / 100 + thumbWidth / 2 + 1;
    const calculatedProgressBarWidth =
      progress > 1
        ? (progressBarMaxWidth * progress) / 100 + thumbWidth
        : (progressBarMaxWidth * progress) / 100 + 10;

    setPosition(calculatedPosition);
    setProgressBarWidth(calculatedProgressBarWidth);
  };

  useEffect(() => {
    updateProgress();
  }, [progress]);

  const updateVolume = () => {
    if (type !== 'volume') {
      return;
    }

    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const progressBarMaxWidth = rangeWidth - thumbWidth;

    const calculatedPosition =
      (progressBarMaxWidth * progress) / 100 + thumbWidth / 2 + 1;
    const calculatedProgressBarWidth =
      progress > 1
        ? (progressBarMaxWidth * progress) / 100 + thumbWidth
        : (progressBarMaxWidth * progress) / 100 + 10;

    setPosition(calculatedPosition);
    setProgressBarWidth(calculatedProgressBarWidth);
  };

  useEffect(() => {
    if (type === 'volume') {
      window.addEventListener('resize', updateVolume);
      return () => {
        window.removeEventListener('resize', updateVolume);
      };
    }
  }, [type, progress]);

  return (
    <div className='slider-container'>
      <div className='range-background'></div>
      <div
        className='range-cover'
        style={{ width: `${progressBarWidth}px` }}
      ></div>
      <div
        className='range-thumb'
        style={{ left: `${position}px` }}
        ref={thumbRef}
      ></div>
      <input
        type='range'
        value={progress}
        onChange={onChange}
        className='slider-range'
        ref={rangeRef}
      />
    </div>
  );
}

export default Slider;
