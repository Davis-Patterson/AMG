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
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Home.css';

function Home() {
  const { darkMode, homeData, homeIndex, setHomeIndex } =
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
      setHomeIndex((homeIndex + 1) % (homeData.length + 2));
    }
  }, [isPaused, homeIndex, homeData.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setHomeIndex(1);
  }, [setHomeIndex]);

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

  const handlePrev = () => {
    setProgress(0);
    setHomeIndex((homeIndex - 1 + homeData.length + 2) % (homeData.length + 2));
  };

  const handleNext = () => {
    setProgress(0);
    setHomeIndex((homeIndex + 1) % (homeData.length + 2));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector('.home-header-pics-wrapper');
    const titleWrapper = document.querySelector(
      '.home-header-pics-title-wrapper'
    );
    if (homeIndex === homeData.length + 1) {
      setHomeIndex(1);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-100%)`;
      titleWrapper.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    } else if (homeIndex === 0) {
      setHomeIndex(homeData.length);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-${100 * homeData.length}%)`;
      titleWrapper.style.transform = `translateX(-${100 * homeData.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  if (!homeData || homeData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='home-header' id='home-header'>
            <section className='home-header-pics-container'>
              <div className='loading-text-container'>
                <h2 className='loading-text'>LOADING</h2>
                <CircularProgress
                  size={22}
                  sx={{ color: 'var(--clr-text)', marginLeft: '2px' }}
                />
              </div>
            </section>
          </header>
          <div className='gap' />
        </main>
      </>
    );
  }

  return (
    <>
      <main className='home-container' id='home-container'>
        <header className='home-display' id='home-header'>
          <section
            className='home-header-pics-container'
            id='home-header-pics-container'
          >
            <div
              className='home-header-pics-wrapper'
              style={{ transform: `translateX(${-100 * homeIndex}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              <div className='home-header-pic-wrapper'>
                <img
                  src={homeData[homeData.length - 1].img}
                  alt={homeData[homeData.length - 1].title}
                  className='home-header-pic'
                />
              </div>
              {homeData.map((img, index) => (
                <div key={index} className='home-header-pic-wrapper'>
                  <img
                    src={img.img}
                    alt={img.title}
                    className='home-header-pic'
                  />
                </div>
              ))}
              <div className='home-header-pic-wrapper'>
                <img
                  src={homeData[0].img}
                  alt={homeData[0].title}
                  className='home-header-pic'
                />
              </div>
            </div>
          </section>
          <section className='home-header-overlays'>
            <div className='home-header-pic-title-gradient' />
            <div className='home-header-pic-title-container'>
              <div
                className='home-header-pics-title-wrapper'
                style={{ transform: `translateX(${-100 * homeIndex}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                <div className='home-header-pic-title-wrapper'>
                  <p className='home-header-pic-title'>
                    {homeData[homeData.length - 1].title}
                  </p>
                </div>
                {homeData.map((title, index) => (
                  <div className='home-header-pic-title-wrapper' key={index}>
                    <p className='home-header-pic-title'>{title.title}</p>
                  </div>
                ))}
                <div className='home-header-pic-title-wrapper'>
                  <p className='home-header-pic-title'>{homeData[0].title}</p>
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
        </header>
        <div className='gap' />
      </main>
    </>
  );
}

export default Home;
