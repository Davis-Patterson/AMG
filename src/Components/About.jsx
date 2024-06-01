import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
import Locations from 'utils/Locations';
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
import skylineImg from 'assets/About/skyline.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/About.css';

function About() {
  const { darkMode, studioData, aboutPicIndex, setAboutPicIndex } =
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
      setAboutPicIndex((aboutPicIndex + 1) % (studioData.length + 2));
    }
  }, [isPaused, aboutPicIndex, studioData.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAboutPicIndex(1);
  }, [setAboutPicIndex]);

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
    setAboutPicIndex(
      (aboutPicIndex - 1 + studioData.length + 2) % (studioData.length + 2)
    );
  };

  const handleNext = () => {
    setProgress(0);
    setAboutPicIndex((aboutPicIndex + 1) % (studioData.length + 2));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector('.about-header-pics-wrapper');
    const titleWrapper = document.querySelector(
      '.about-header-pics-title-wrapper'
    );
    if (aboutPicIndex === studioData.length + 1) {
      setAboutPicIndex(1);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-100%)`;
      titleWrapper.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    } else if (aboutPicIndex === 0) {
      setAboutPicIndex(studioData.length);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-${100 * studioData.length}%)`;
      titleWrapper.style.transform = `translateX(-${100 * studioData.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  if (!studioData || studioData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='about-header' id='about-header'>
            <div className='about-header-gradient-overlay' />
            <section className='about-header-text-container'>
              <div className='about-brand-container'>
                <h1 className='about-brand-title'>WHO WE ARE</h1>
                <p className='about-tagline'>
                  A collective of music lovers, inspired entrepreneurs,
                  game-changing creatives and passionate teams.
                </p>
              </div>
            </section>
            <section className='about-header-pics-container'>
              <Skeleton className='header-skeleton' />
            </section>
          </header>
          <Banner />
          <section className='loading-content-container'>
            <div className='loading-content'>
              <div className='loading-text-container'>
                <h2 className='loading-text'>LOADING</h2>
                <CircularProgress
                  size={22}
                  sx={{ color: 'var(--clr-text)', marginLeft: '2px' }}
                />
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
              </div>
            </div>
          </section>
          <div className='gap' />
        </main>
      </>
    );
  }

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='about-header' id='about-header'>
          <div className='about-header-gradient-overlay' />
          <section className='about-header-text-container'>
            <div className='about-brand-container'>
              <h1 className='about-brand-title'>WHO WE ARE</h1>
              <p className='about-tagline'>
                A collective of music lovers, inspired entrepreneurs,
                game-changing creatives and passionate teams.
              </p>
            </div>
          </section>
          <section className='about-header-pics-container'>
            <div
              className='about-header-pics-wrapper'
              style={{ transform: `translateX(${-100 * aboutPicIndex}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              <div className='about-header-pic-wrapper'>
                <img
                  src={studioData[studioData.length - 1].img}
                  alt={studioData[studioData.length - 1].title}
                  className='about-header-pic'
                />
              </div>
              {studioData.map((img, index) => (
                <div key={index} className='about-header-pic-wrapper'>
                  <img
                    src={img.img}
                    alt={img.title}
                    className='about-header-pic'
                  />
                </div>
              ))}
              <div className='about-header-pic-wrapper'>
                <img
                  src={studioData[0].img}
                  alt={studioData[0].title}
                  className='about-header-pic'
                />
              </div>
            </div>
          </section>
          <section className='about-header-overlays'>
            <div className='about-header-pic-title-container'>
              <div
                className='about-header-pics-title-wrapper'
                style={{ transform: `translateX(${-100 * aboutPicIndex}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                <div className='about-header-pic-title-wrapper'>
                  <p className='about-header-pic-title'>
                    {studioData[studioData.length - 1].title}
                  </p>
                </div>
                {studioData.map((title, index) => (
                  <div className='about-header-pic-title-wrapper' key={index}>
                    <p className='about-header-pic-title'>{title.title}</p>
                  </div>
                ))}
                <div className='about-header-pic-title-wrapper'>
                  <p className='about-header-pic-title'>
                    {studioData[0].title}
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
        </header>
        <Banner />
        <section className='about-content-container'>
          <div className='about-content'>
            <div className='about-img-container'>
              <div className='about-gradient' />
              <img src={skylineImg} alt='about pic' className='about-img' />
            </div>
            <div className='about-text-container'>
              <p className='about-text-title'>ABOUT US</p>
              <p className='about-text'>
                We believe in creating workplace experiences that foster
                original thinking, encourage collaboration, and promote career
                growth.
              </p>
              <p className='about-text'>
                Striving to become a more ethical, equitable, and
                environmentally sustainable company is imperative to us, and
                important to our longterm creative and commercial success.
              </p>
              <p className='about-text'>
                It’s the universal language. It inspires us, moves us, thrills
                us, heals us and ultimately unites us all. As the world’s
                leading music company, it’s our responsibility to nurture music,
                and to foster artistry and self-expression. In a world that
                desperately needs to find more common ground, there is no better
                way to provide it, than through music.
              </p>
            </div>
          </div>
        </section>
        <Locations />
        <div className='gap' />
      </main>
    </>
  );
}

export default About;
