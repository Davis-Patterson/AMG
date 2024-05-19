import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from 'assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-words-white.png';
import darkmodeIcon from 'assets/Utils/darkmode-white.svg';
import lightmodeIcon from 'assets/Utils/lightmode-black.svg';
import darkMuteIcon from 'assets/Utils/mute-black.svg';
import lightMuteIcon from 'assets/Utils/mute-white.svg';
import darkUnmuteIcon from 'assets/Utils/unmute-black.svg';
import lightUnmuteIcon from 'assets/Utils/unmute-white.svg';
import DehazeIcon from '@mui/icons-material/Dehaze';
import 'styles/Nav.css';

const Nav = () => {
  const {
    darkMode,
    setDarkMode,
    setShowSplash,
    mute,
    setMute,
    dropdown,
    setDropdown,
  } = useContext(AppContext);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;
  const currentDarkmodeIcon = darkMode ? darkmodeIcon : lightmodeIcon;

  const currentMuteIcon = darkMode ? lightMuteIcon : darkMuteIcon;
  const currentUnmuteIcon = darkMode ? lightUnmuteIcon : darkUnmuteIcon;
  const currentSoundIcon = mute ? currentMuteIcon : currentUnmuteIcon;

  const dropdownRef = useRef(null);
  const menuIconRef = useRef(null);

  const navigate = useNavigate();

  const handleNavClick = (path) => {
    setShowSplash(true);
    setDropdown(false);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuIconRef.current &&
        (menuIconRef.current === event.target ||
          menuIconRef.current.contains(event.target))
      ) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleDarkModeClick = (event) => {
    setDarkMode(!darkMode);
  };

  const handleMuteClick = (event) => {
    setMute(!mute);
  };

  const handleMenu = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  }, [darkMode]);

  return (
    <>
      <nav className='nav-container'>
        <main className='nav-contents'>
          <section className='home-button-container'>
            <div onClick={() => handleNavClick('/')} className='home-button'>
              <img src={currentLogo} alt='AMG logo' className='AMG-logo-nav' />
            </div>
            <div className='home-button-adjacent'></div>
          </section>
          <section className='nav-buttons-container' id='nav-buttons-container'>
            <div
              onClick={() => handleNavClick('/news')}
              className='nav-button'
              id='news-button-nav'
            >
              News
            </div>
            <div
              onClick={() => handleNavClick('/artists')}
              className='nav-button'
              id='artists-button-nav'
            >
              Artists
            </div>
            <div
              onClick={() => handleNavClick('/about')}
              className='nav-button'
              id='about-button-nav'
            >
              About
            </div>
            <div
              onClick={() => handleNavClick('/contact')}
              className='nav-button'
              id='contact-button-nav'
            >
              Contact
            </div>
            <img
              src={currentDarkmodeIcon}
              alt='darkmode icon'
              className='dark-toggle'
              id='dark-toggle'
              onClick={handleDarkModeClick}
            />
            <img
              src={currentSoundIcon}
              alt='mute/unmute icon'
              className='mute-toggle'
              id='mute-toggle'
              onClick={handleMuteClick}
            />
            <DehazeIcon
              className='menu-icon'
              onClick={handleMenu}
              ref={menuIconRef}
              id='menu-icon'
              style={{ display: 'none' }}
            />
          </section>
        </main>
        {dropdown && (
          <div className='dropdown-menu' id='dropdown-menu' ref={dropdownRef}>
            <div className='dropdown-links'>
              <div
                onClick={() => handleNavClick('/news')}
                className='dropdown-link'
                id='dropdown-link'
              >
                News
              </div>
              <div
                onClick={() => handleNavClick('/artists')}
                className='dropdown-link'
                id='dropdown-link'
              >
                Artists
              </div>
              <div
                onClick={() => handleNavClick('/about')}
                className='dropdown-link'
                id='dropdown-link'
              >
                About
              </div>
              <div
                onClick={() => handleNavClick('/contact')}
                className='dropdown-link'
                id='dropdown-link'
              >
                Contact
              </div>
            </div>
            <div className='dropdown-toggles' id='dropdown-toggles'>
              <img
                src={currentDarkmodeIcon}
                alt='darkmode icon'
                className='dropdown-dark-toggle'
                onClick={handleDarkModeClick}
              />
              <img
                src={currentSoundIcon}
                alt='mute/unmute icon'
                className='dropdown-mute-toggle'
                onClick={handleMuteClick}
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
