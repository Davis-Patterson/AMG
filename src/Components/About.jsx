import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
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
import Locations from 'utils/Locations';
import 'styles/About.css';

function About() {
  const {
    darkMode,
    studioData,
    currentAboutPicIndex,
    setCurrentAboutPicIndex,
    nextAboutPicIndex,
    setNextAboutPicIndex,
  } = useContext(AppContext);

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');

  const currentNext = darkMode ? nextWhite : nextBlack;
  const currentPrev = darkMode ? prevWhite : prevBlack;
  const currentPipe = darkMode ? pipeWhite : pipeBlack;
  const currentPlay = darkMode ? playWhite : playBlack;
  const currentPause = darkMode ? pauseWhite : pauseBlack;
  const currentPlayPause = isPaused ? currentPlay : currentPause;

  const autoProg = useCallback(() => {
    if (!isPaused) {
      setTransitionDirection('forward');
      setIsFading(true);
      setProgress(0);
      setNextAboutPicIndex((currentAboutPicIndex + 1) % studioData.length);
      setTimeout(() => {
        setCurrentAboutPicIndex((currentAboutPicIndex + 1) % studioData.length);
        setIsFading(false);
      }, 2000);
    }
  }, [isPaused, currentAboutPicIndex, studioData.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNextAboutPicIndex((currentAboutPicIndex + 1) % studioData.length);
  }, []);

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
    setTransitionDirection('reverse');
    setIsFading(true);
    setProgress(0);
    setNextAboutPicIndex(
      (currentAboutPicIndex - 1 + studioData.length) % studioData.length
    );
    setTimeout(() => {
      setCurrentAboutPicIndex(
        (currentAboutPicIndex - 1 + studioData.length) % studioData.length
      );
      setIsFading(false);
    }, 2000);
  };

  const handleNext = () => {
    setTransitionDirection('forward');
    setIsFading(true);
    setProgress(0);
    setNextAboutPicIndex((currentAboutPicIndex + 1) % studioData.length);
    setTimeout(() => {
      setCurrentAboutPicIndex((currentAboutPicIndex + 1) % studioData.length);
      setIsFading(false);
    }, 2000);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='about-header' id='about-header'>
          <div className='about-header-gradient-overlay' />
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
            <img
              src={studioData[currentAboutPicIndex].img}
              alt='current studio pic'
              className={`about-header-pics ${
                isFading
                  ? transitionDirection === 'forward'
                    ? 'fade-out'
                    : 'fade-out-reverse'
                  : ''
              }`}
            />
            <img
              src={studioData[nextAboutPicIndex].img}
              alt='next studio pic'
              className={`about-header-pics ${
                isFading
                  ? transitionDirection === 'forward'
                    ? 'fade-in'
                    : 'fade-in-reverse'
                  : ''
              }`}
            />
          </section>
          <div className='progress-bar'>
            <div
              className='progress-bar-fill'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className='controls-container'>
            <div className='controls'>
              <img
                src={currentPrev}
                alt='prev button'
                className='controls-button'
                onClick={handlePrev}
              />
              <img
                src={currentPipe}
                alt='prev button'
                className='controls-pipe'
              />
              <img
                src={currentNext}
                alt='prev button'
                className='controls-button'
                onClick={handleNext}
              />
              <img
                src={currentPlayPause}
                alt='prev button'
                className='controls-button'
                onClick={handlePause}
              />
            </div>
          </div>
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
