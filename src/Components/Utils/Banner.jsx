import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import ArrowFillBlack from 'assets/Banner/arrows-fill-black.svg';
import ArrowFillWhite from 'assets/Banner/arrows-fill-white.svg';
import ArrowOutlineBlack from 'assets/Banner/arrows-outline-black.svg';
import ArrowOutlineWhite from 'assets/Banner/arrows-outline-white.svg';
import 'styles/Utils/Banner.css';

function Banner({ data, slideClass }) {
  const { darkMode, handleLinkClick, formatTitleForURL } =
    useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const contentRef = useRef();
  const requestRef = useRef();

  const arrowFill = darkMode ? ArrowFillWhite : ArrowFillBlack;
  const arrowOutline = darkMode ? ArrowOutlineWhite : ArrowOutlineBlack;

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

  const getLogoImgs = (item) => {
    const logos = [];

    const addLogos = (logoArray) => {
      logoArray.forEach((logoType) => {
        logos.push(darkMode ? logoType.white : logoType.black);
      });
    };

    if (item.logos) {
      item.logos.forEach((logoType) => {
        for (const key in logoType) {
          const logo = logoType[key][0];
          logos.push(darkMode ? logo.white : logo.black);
        }
      });
    }

    if (item.logo) {
      addLogos(item.logo);
    }

    return logos;
  };

  const getLink = (entity, name) => {
    if (entity) {
      return entity === 'AMG'
        ? '/about'
        : `/artists/${formatTitleForURL(entity)}`;
    }
    if (name) {
      return `/artists/${formatTitleForURL(name)}`;
    }
    return '/about';
  };

  const bannerItems = [];
  let useArrowFill = true;

  if (data && data.length > 0) {
    data.forEach((item, index) => {
      const logos = getLogoImgs(item);
      logos.forEach((logo, logoIndex) => {
        bannerItems.push(
          <a
            href={getLink(item.entity, item.name)}
            onMouseDown={(event) =>
              handleLinkClick(event, getLink(item.entity, item.name))
            }
            className='banner-link-wrapper'
          >
            <img
              key={`logo-${index}-${logoIndex}`}
              src={logo}
              alt={item.title || item.name}
              className={`${slideClass}-banner-img`}
              style={{ willChange: 'transform', cursor: 'pointer' }}
            />
          </a>
        );

        const arrow = useArrowFill ? arrowFill : arrowOutline;
        bannerItems.push(
          <img
            key={`arrow-${index}-${logoIndex}`}
            src={arrow}
            alt='arrow'
            className={`${slideClass}-banner-arrow`}
            style={{ cursor: 'default' }}
          />
        );
        useArrowFill = !useArrowFill;
      });
    });
  } else {
    for (let i = 0; i < 8; i++) {
      const arrow = i % 2 === 0 ? arrowFill : arrowOutline;
      bannerItems.push(
        <img
          key={`arrow-${i}`}
          src={arrow}
          alt='arrow'
          className={`${slideClass}-banner-arrow`}
          style={{ cursor: 'default' }}
        />
      );
    }
  }

  return (
    <section
      className={`${slideClass}-banner-container`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
      style={{ willChange: 'transform' }}
    >
      <div className={`${slideClass}-banner-wrapper`}>
        <div
          className={`${slideClass}-banner-content`}
          ref={contentRef}
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: 'transform 0s linear',
            willChange: 'transform',
          }}
        >
          {[...Array(6)].flatMap((_, repeatIndex) =>
            bannerItems.map((item, index) =>
              React.cloneElement(item, { key: `${repeatIndex}-${index}` })
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
