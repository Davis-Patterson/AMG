import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
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
  const {
    darkMode,
    artistsData,
    setShowSplash,
    artistsPicIndex,
    setArtistsPicIndex,
    formatTitleForURL,
  } = useContext(AppContext);

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentNext = darkMode ? nextWhite : nextBlack;
  const currentPrev = darkMode ? prevWhite : prevBlack;
  const currentPipe = darkMode ? pipeWhite : pipeBlack;
  const currentPlay = darkMode ? playWhite : playBlack;
  const currentPause = darkMode ? pauseWhite : pauseBlack;
  const currentPlayPause = isPaused ? currentPlay : currentPause;

  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const autoProg = useCallback(() => {
    if (!isPaused) {
      setProgress(0);
      setArtistsPicIndex((artistsPicIndex + 1) % (artistsData.length + 2));
    }
  }, [isPaused, artistsPicIndex, artistsData.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setArtistsPicIndex(1);
  }, [setArtistsPicIndex]);

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
    setArtistsPicIndex(
      (artistsPicIndex - 1 + artistsData.length + 2) % (artistsData.length + 2)
    );
  };

  const handleNext = () => {
    setProgress(0);
    setArtistsPicIndex((artistsPicIndex + 1) % (artistsData.length + 2));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector('.artists-header-pics-wrapper');
    const nameWrapper = document.querySelector(
      '.artists-header-pics-name-wrapper'
    );
    if (artistsPicIndex === artistsData.length + 1) {
      setArtistsPicIndex(1);
      wrapper.style.transition = 'none';
      nameWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-100%)`;
      nameWrapper.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        nameWrapper.style.transition = '';
      }, 100);
    } else if (artistsPicIndex === 0) {
      setArtistsPicIndex(artistsData.length);
      wrapper.style.transition = 'none';
      nameWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-${100 * artistsData.length}%)`;
      nameWrapper.style.transform = `translateX(-${100 * artistsData.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        nameWrapper.style.transition = '';
      }, 100);
    }
  };

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='artists-header' id='artists-header'>
          <div className='artists-header-gradient-overlay' />
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
            <div
              className='artists-header-pics-wrapper'
              style={{ transform: `translateX(${-100 * artistsPicIndex}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              <div className='artists-header-pic-wrapper'>
                <img
                  src={artistsData[artistsData.length - 1].img}
                  alt={artistsData[artistsData.length - 1].name}
                  className='artists-header-pic'
                />
              </div>
              {artistsData.map((artist, index) => (
                <div key={index} className='artists-header-pic-wrapper'>
                  <img
                    src={artist.img}
                    alt={artist.name}
                    className='artists-header-pic'
                  />
                </div>
              ))}
              <div className='artists-header-pic-wrapper'>
                <img
                  src={artistsData[0].img}
                  alt={artistsData[0].name}
                  className='artists-header-pic'
                />
              </div>
            </div>
          </section>
          <section className='artists-header-overlays'>
            <div className='artists-header-pic-name-container'>
              <div
                className='artists-header-pics-name-wrapper'
                style={{ transform: `translateX(${-100 * artistsPicIndex}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                <div className='artists-header-pic-name-wrapper'>
                  <p className='artists-header-pic-name'>
                    {artistsData[artistsData.length - 1].name}
                  </p>
                </div>
                {artistsData.map((artist, index) => (
                  <div className='artists-header-pic-name-wrapper' key={index}>
                    <p className='artists-header-pic-name'>{artist.name}</p>
                  </div>
                ))}
                <div className='artists-header-pic-name-wrapper'>
                  <p className='artists-header-pic-name'>
                    {artistsData[0].name}
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
        <section className='artists-content-container'>
          <div className='artists-content'>
            {artistsData.map((artist, index) => (
              <div
                key={index}
                className='artist-card'
                onClick={() =>
                  handleLinkClick(`/artists/${formatTitleForURL(artist.name)}`)
                }
              >
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
