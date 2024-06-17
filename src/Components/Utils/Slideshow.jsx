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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';

const Slideshow = ({ data, index, setIndex, slideClass }) => {
  const { darkMode, handleLinkClick, formatTitleForURL } =
    useContext(AppContext);

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
      setIndex((prevIndex) => (prevIndex + 1) % (data.length + 2));
    }
  }, [isPaused, data.length, setIndex]);

  const handlePrev = () => {
    setProgress(0);
    setIndex(
      (prevIndex) => (prevIndex - 1 + data.length + 2) % (data.length + 2)
    );
  };

  const handleNext = () => {
    setProgress(0);
    setIndex((prevIndex) => (prevIndex + 1) % (data.length + 2));
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

    if (index === data.length + 1) {
      setIndex(1);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${-100}%)`;
      titleWrapper.style.transform = `translateX(${-100}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    } else if (index === 0) {
      setIndex(data.length);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${-100 * data.length}%)`;
      titleWrapper.style.transform = `translateX(${-100 * data.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  if (!data || data.length === 0) {
    return (
      <>
        <section className='artists-header-pics-container'>
          <Skeleton className='header-skeleton' />
          <div className='circular-progress-container'>
            <CircularProgress
              size={40}
              sx={{
                color: 'var(--clr-dark)',
              }}
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className={`${slideClass}-header-pics-container`}>
        <div
          className={`${slideClass}-header-pics-wrapper`}
          style={{ transform: `translateX(${-100 * index}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className={`${slideClass}-header-pic-wrapper`}>
            <img
              src={data[data.length - 1].banner || data[data.length - 1].img}
              alt={data[data.length - 1].title || data[data.length - 1].name}
              className={`${slideClass}-header-pic`}
              loading='lazy'
            />
          </div>
          {data.map((item, idx) => (
            <div key={idx} className={`${slideClass}-header-pic-wrapper`}>
              <img
                src={item.banner || item.img}
                alt={item.title || item.name}
                className={`${slideClass}-header-pic`}
                loading='lazy'
              />
            </div>
          ))}
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
            <div
              className={`${slideClass}-header-pic-title-wrapper`}
              onClick={() =>
                slideClass === 'artists'
                  ? handleLinkClick(
                      `/artists/${formatTitleForURL(
                        data[data.length - 1].name
                      )}`
                    )
                  : null
              }
            >
              <p className={`${slideClass}-header-pic-title`}>
                {data[data.length - 1].title || data[data.length - 1].name}
              </p>
            </div>
            {data.map((title, idx) => (
              <div
                className={`${slideClass}-header-pic-title-wrapper`}
                onClick={() =>
                  slideClass === 'artists'
                    ? handleLinkClick(
                        `/artists/${formatTitleForURL(title.name)}`
                      )
                    : null
                }
                key={idx}
              >
                <p className={`${slideClass}-header-pic-title`}>
                  {title.title || title.name}
                </p>
              </div>
            ))}
            <div
              className={`${slideClass}-header-pic-title-wrapper`}
              onClick={() =>
                slideClass === 'artists'
                  ? handleLinkClick(
                      `/artists/${formatTitleForURL(data[0].name)}`
                    )
                  : null
              }
            >
              <p className={`${slideClass}-header-pic-title`}>
                {data[0].title || data[0].name}
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
