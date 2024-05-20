import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
import AMGLogoBlack from 'assets/Logos/AMG-full-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-white.png';
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
import 'styles/About.css';

function About() {
  const { darkMode } = useContext(AppContext);

  const [picIndex, setPicIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState('in');

  const studioPics = [
    ampPic,
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
  ];

  const initialIndexValue = 1;
  const lastPic = studioPics.length;

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

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
    setPicIndex((prevPicIndex) => {
      if (prevPicIndex === 1) {
        return lastPic;
      } else {
        return prevPicIndex - 1;
      }
    });
    setProgress(0);
  };

  const handleNext = () => {
    setPicIndex((prevPicIndex) => {
      if (prevPicIndex === lastPic) {
        return 1;
      } else {
        return prevPicIndex + 1;
      }
    });
    setProgress(0);
  };

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='about-header' id='about-header'>
          <section className='about-header-logo-container'>
            <img
              src={currentLogo}
              alt='background img'
              className='about-header-logo'
            />
            <div className='about-brand-container'>
              <p className='about-brand-title'>Aurum Management Group</p>
              <p className='about-tagline'>// tagline //</p>
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
        </header>
        <Banner />
        <div className='gap' />
      </main>
    </>
  );
}

export default About;
