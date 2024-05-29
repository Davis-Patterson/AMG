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
import 'styles/Artists.css';

function Artists() {
  const { darkMode, artistsData } = useContext(AppContext);

  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const [nextPicIndex, setNextPicIndex] = useState(1);
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
      setNextPicIndex((currentPicIndex + 1) % artistsData.length);
      setTimeout(() => {
        setCurrentPicIndex((currentPicIndex + 1) % artistsData.length);
        setIsFading(false);
      }, 2000);
    }
  }, [isPaused, currentPicIndex, artistsData.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNextPicIndex((currentPicIndex + 1) % artistsData.length);
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
    setNextPicIndex(
      (currentPicIndex - 1 + artistsData.length) % artistsData.length
    );
    setTimeout(() => {
      setCurrentPicIndex(
        (currentPicIndex - 1 + artistsData.length) % artistsData.length
      );
      setIsFading(false);
    }, 2000);
  };

  const handleNext = () => {
    setTransitionDirection('forward');
    setIsFading(true);
    setProgress(0);
    setNextPicIndex((currentPicIndex + 1) % artistsData.length);
    setTimeout(() => {
      setCurrentPicIndex((currentPicIndex + 1) % artistsData.length);
      setIsFading(false);
    }, 2000);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='artists-header' id='artists-header'>
          <div className='artists-header-gradient-overlay' />
          {/* <div className='artists-header-gradient-overlay' /> */}
          <section className='artists-header-text-container'>
            <div className='artists-brand-container'>
              <h1 className='artists-brand-title'>ARTISTS</h1>
              <p className='artists-tagline'>
                Celebrating talent, nurturing visionaries, and amplifying voices
                around the world.
              </p>
            </div>
          </section>
          <section className='artists-header-pics-container'>
            <img
              src={artistsData[currentPicIndex].img}
              alt='current studio pic'
              className={`artists-header-pics ${
                isFading
                  ? transitionDirection === 'forward'
                    ? 'fade-out'
                    : 'fade-out-reverse'
                  : ''
              }`}
            />
            <img
              src={artistsData[nextPicIndex].img}
              alt='next studio pic'
              className={`artists-header-pics ${
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
        <section className='artists-content-container'>
          <div className='artists-content'>
            {artistsData.map((artist, index) => (
              <div key={index} className='artist-card'>
                <img
                  src={artist.img}
                  alt={artist.name}
                  className='artist-img'
                />
                <p className='artist-name'>{artist.name}</p>
              </div>
            ))}
          </div>
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default Artists;
