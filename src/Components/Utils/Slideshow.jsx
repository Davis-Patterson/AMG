import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import nextBlack from 'assets/Utils/next-black.svg';
import nextWhite from 'assets/Utils/next-white.svg';
import prevBlack from 'assets/Utils/prev-black.svg';
import prevWhite from 'assets/Utils/prev-white.svg';
import pauseBlack from 'assets/Utils/pause-black.svg';
import pauseWhite from 'assets/Utils/pause-white.svg';
import playBlack from 'assets/Utils/play-black.svg';
import playWhite from 'assets/Utils/play-white.svg';
import pipeBlack from 'assets/Utils/pipe-black.svg';
import pipeWhite from 'assets/Utils/pipe-white.svg';

const Slideshow = ({ data, index, setIndex, slideClass }) => {
  const { darkMode } = useContext(AppContext);

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentNext = darkMode ? nextWhite : nextBlack;
  const currentPrev = darkMode ? prevWhite : prevBlack;
  const currentPipe = darkMode ? pipeWhite : pipeBlack;
  const currentPlay = darkMode ? playWhite : playBlack;
  const currentPause = darkMode ? pauseWhite : pauseBlack;
  const currentPlayPause = isPaused ? currentPlay : currentPause;

  const autoProg = useCallback(() => {
    if (!isPaused) {
      setProgress(0);
      setIndex((index + 1) % (data.length + 1));
    }
  }, [isPaused, index, data.length, setIndex]);

  const handlePrev = () => {
    setProgress(0);
    setIndex((index - 1 + data.length + 1) % (data.length + 1));
  };

  const handleNext = () => {
    setProgress(0);
    setIndex((index + 1) % (data.length + 1));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (!isPaused && prevProgress < 100) {
          return prevProgress + 1;
        } else {
          return prevProgress;
        }
      });
    }, 100);

    if (progress === 100 && !isPaused) {
      autoProg();
    }

    return () => {
      clearInterval(progressTimer);
    };
  }, [isPaused, progress, autoProg]);

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector(
      `.${slideClass}-header-pics-wrapper`
    );
    const titleWrapper = document.querySelector(
      `.${slideClass}-header-pics-title-wrapper`
    );
    if (index === data.length) {
      setIndex(0);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(0%)`;
      titleWrapper.style.transform = `translateX(0%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  return (
    <>
      <section className={`${slideClass}-header-pics-container`}>
        <div
          className={`${slideClass}-header-pics-wrapper`}
          style={{ transform: `translateX(${-100 * index}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {data.map((item, index) => (
            <div key={index} className={`${slideClass}-header-pic-wrapper`}>
              <img
                src={item.banner || item.img}
                alt={item.title || item.name}
                className={`${slideClass}-header-pic`}
                loading='lazy'
              />
            </div>
          ))}
          {/* Clone of the first video for seamless looping */}
          <div className={`${slideClass}-header-pic-wrapper`}>
            <img
              src={data[0].banner || data[0].img}
              alt={data[0].title || data[0].name}
              className={`${slideClass}-header-pic`}
              loading='lazy'
            />
          </div>
        </div>
      </section>
      <section className={`${slideClass}-header-overlays`}>
        <div className={`${slideClass}-header-pic-title-container`}>
          <div
            className={`${slideClass}-header-pics-title-wrapper`}
            style={{ transform: `translateX(${-100 * index}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {data.map((title, index) => (
              <div
                className={`${slideClass}-header-pic-title-wrapper`}
                key={index}
              >
                <p className={`${slideClass}-header-pic-title`}>
                  {title.title}
                </p>
              </div>
            ))}
            <div className={`${slideClass}-header-pic-title-wrapper`}>
              <p className={`${slideClass}-header-pic-title`}>
                {data[0].title}
              </p>
            </div>
          </div>
        </div>
        <div className='controls-container'>
          <div className='controls'>
            <img
              src={currentPrev}
              alt='prev button'
              className='controls-button'
              onClick={handlePrev}
            />
            <img src={currentPipe} alt='pipe' className='controls-pipe' />
            <img
              src={currentNext}
              alt='next button'
              className='controls-button'
              onClick={handleNext}
            />
            <img
              src={currentPlayPause}
              alt='play/pause button'
              className='controls-button'
              onClick={handlePause}
            />
          </div>
        </div>
        <div className='progress-bar'>
          <div
            className='progress-bar-fill'
            style={{
              width: `${progress}%`,
              transition: progress === 0 ? 'none' : 'width 0.1s linear',
            }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default Slideshow;
