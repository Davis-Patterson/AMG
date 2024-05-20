import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGBigBlack from 'assets/Banner/AMG-logo-big-black.svg';
import AMGBigWhite from 'assets/Banner/AMG-logo-big-white.svg';
import AMGSmallBlack from 'assets/Banner/AMG-logo-small-black.svg';
import AMGSmallWhite from 'assets/Banner/AMG-logo-small-white.svg';
import AMGTextFillBlack from 'assets/Banner/AMG-text-fill-black.svg';
import AMGTextFillWhite from 'assets/Banner/AMG-text-fill-white.svg';
import AMGTextOutlineBlack from 'assets/Banner/AMG-text-outline-black.svg';
import AMGTextOutlineWhite from 'assets/Banner/AMG-text-outline-white.svg';
import ArrowsFillBlack from 'assets/Banner/arrows-fill-black.svg';
import ArrowsFillWhite from 'assets/Banner/arrows-fill-white.svg';
import ArrowsOutlineBlack from 'assets/Banner/arrows-outline-black.svg';
import ArrowsOutlineWhite from 'assets/Banner/arrows-outline-white.svg';
import 'styles/Banner.css';

function Banner() {
  const { darkMode } = useContext(AppContext);

  const blackIcons = [
    AMGBigBlack,
    ArrowsFillBlack,
    AMGTextFillBlack,
    ArrowsOutlineBlack,
    AMGSmallBlack,
    ArrowsFillBlack,
    AMGTextOutlineBlack,
    ArrowsOutlineBlack,
  ];
  const whiteIcons = [
    AMGBigWhite,
    ArrowsFillWhite,
    AMGTextFillWhite,
    ArrowsOutlineWhite,
    AMGSmallWhite,
    ArrowsFillWhite,
    AMGTextOutlineWhite,
    ArrowsOutlineWhite,
  ];

  const currentIcons = darkMode ? whiteIcons : blackIcons;

  return (
    <>
      <section className='banner-container'>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
        <div className='banner-content'>
          {currentIcons.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt='banner imgs'
              className='banner-img'
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Banner;
