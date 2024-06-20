import React, { useState, useEffect, useRef, useContext } from 'react';
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
import 'styles/Utils/Banner.css';

function Banner() {
  const { darkMode, amgBanner, handleLinkClick } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const contentRef = useRef();
  const requestRef = useRef();

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
  const scrollSpeed = isHovered ? 0.5 : 1.5;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const animate = () => {
    if (contentRef.current && !isPaused) {
      const totalWidth = contentRef.current.scrollWidth / 2;
      setScrollPosition((prev) => {
        const newPosition = prev - scrollSpeed;
        if (Math.abs(newPosition) >= totalWidth) {
          return 0;
        }
        return newPosition;
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [scrollSpeed, isPaused]);

  const handleClick = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    setIsPaused((prev) => !prev);
  };

  return (
    <section
      className='banner-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
      style={{ willChange: 'transform' }}
    >
      <div className='banner-wrapper'>
        <div
          className='banner-content'
          ref={contentRef}
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: 'transform 0s linear',
            willChange: 'transform',
          }}
        >
          {[...Array(6)].map((_, repeatIndex) =>
            currentIcons.map((imgSrc, index) => (
              <img
                key={`${repeatIndex}-${index}`}
                src={imgSrc}
                alt='banner imgs'
                className='banner-img'
                style={{ willChange: 'transform' }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
