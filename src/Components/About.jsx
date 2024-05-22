import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
import ampPic from 'assets/Studio/amp.jpg';
import lexiconPic from 'assets/Studio/lexicon.jpg';
import o2rPic from 'assets/Studio/o2r.jpg';
import outboard1Pic from 'assets/Studio/outboard1.jpg';
import outboard2Pic from 'assets/Studio/outboard2.jpg';
import prodsuite1Pic from 'assets/Studio/prodsuite1.jpg';
import prodsuite2Pic from 'assets/Studio/prodsuite2.jpg';
import s6protoolsPic from 'assets/Studio/s6protools.jpg';
import ssl1Pic from 'assets/Studio/ssl1.jpg';
import ssl2Pic from 'assets/Studio/ssl2.jpg';
import sslcloseupPic from 'assets/Studio/sslcloseup.jpg';
import sslpatchbayPic from 'assets/Studio/sslpatchbay.jpg';
import suite1Pic from 'assets/Studio/suite1.jpg';
import suite2Pic from 'assets/Studio/suite2.jpg';
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
import nycImg from 'assets/About/nyc-img.jpg';
import londonImg from 'assets/About/london-img.jpg';
import berlinImg from 'assets/About/berlin-img.jpg';
import tokyoImg from 'assets/About/tokyo-img.jpg';
import sydneyImg from 'assets/About/sydney-img.jpg';
import locationsData from 'utilities/Locations.json';
import 'styles/About.css';

function About() {
  const { darkMode } = useContext(AppContext);

  const [picIndex, setPicIndex] = useState(1);
  const [locationIndex, setLocationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [locations, setLocations] = useState([]);

  const [fade, setFade] = useState('in');

  const studioPics = [
    lexiconPic,
    o2rPic,
    outboard1Pic,
    outboard2Pic,
    prodsuite1Pic,
    prodsuite2Pic,
    s6protoolsPic,
    ssl1Pic,
    ssl2Pic,
    sslcloseupPic,
    sslpatchbayPic,
    suite1Pic,
    suite2Pic,
    ampPic,
  ];

  const locationPics = [nycImg, londonImg, berlinImg, tokyoImg, sydneyImg];
  const locationNames = ['New York', 'London', 'Berlin', 'Tokyo', 'Sydney'];

  const currentNext = darkMode ? nextWhite : nextBlack;
  const currentPrev = darkMode ? prevWhite : prevBlack;
  const currentPipe = darkMode ? pipeWhite : pipeBlack;
  const currentPlay = darkMode ? playWhite : playBlack;
  const currentPause = darkMode ? pauseWhite : pauseBlack;
  const currentPlayPause = isPaused ? currentPlay : currentPause;

  const initialIndexValue = 1;
  const lastPic = studioPics.length;

  const autoProg = () => {
    if (!isPaused) {
      setFade('out');
      setProgress(0);
      setTimeout(() => {
        if (picIndex < lastPic) {
          setPicIndex((index) => index + 1);
        } else {
          setPicIndex(initialIndexValue);
        }
        setFade('in');
      }, 200);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLocations(locationsData);
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
  }, [isPaused, autoProg]);

  const handlePrev = () => {
    setFade('out');
    setTimeout(() => {
      setProgress(0);
      setPicIndex((prevPicIndex) => {
        if (prevPicIndex === 1) {
          return lastPic;
        } else {
          return prevPicIndex - 1;
        }
      });
      setFade('in');
    }, 100);
  };

  const handleNext = () => {
    setFade('out');
    setTimeout(() => {
      setProgress(0);
      setPicIndex((prevPicIndex) => {
        if (prevPicIndex === lastPic) {
          return 1;
        } else {
          return prevPicIndex + 1;
        }
      });
      setFade('in');
    }, 100);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleLocationClick = (index) => {
    setLocationIndex(index);
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
            {studioPics.map((picSrc, index) => (
              <img
                key={index}
                src={picSrc}
                alt='studio pics'
                className='about-header-pics'
                style={{ display: picIndex === index + 1 ? 'block' : 'none' }}
              />
            ))}
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
              {/* <p className='controls-number'>{picIndex}</p> */}
              <img
                src={currentPipe}
                alt='prev button'
                className='controls-pipe'
              />
              {/* <p className='controls-number'>{lastPic}</p> */}
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
        <section className='location-container'>
          <div className='about-location'>
            <div className='location-text-container'>
              <p className='location-text-title'>LOCATIONS</p>
              <p className='location-text'>
                {locations[locationIndex] ? locations[locationIndex].desc : ''}
              </p>
            </div>
            <div className='location-img-container'>
              <div className='location-gradient' />
              {locationPics.map((picSrc, index) => (
                <img
                  key={index}
                  src={picSrc}
                  alt='location img'
                  className='location-img'
                  style={{
                    display: locationIndex === index ? 'block' : 'none',
                  }}
                />
              ))}
            </div>
            <div className='location-button-container'>
              {locationNames.map((location, index) => (
                <div
                  key={index}
                  className={`location-button ${
                    locationIndex === index ? 'active' : ''
                  }`}
                  onClick={() => handleLocationClick(index)}
                >
                  <p className='location-button-text'>{location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default About;
