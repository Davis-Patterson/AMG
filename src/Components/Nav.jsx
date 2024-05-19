import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from '/src/assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/Logos/AMG-full-words-white.png';
import darkmodeIcon from '/src/assets/Utils/darkmode-white.svg';
import lightmodeIcon from '/src/assets/Utils/lightmode-black.svg';
import darkMuteIcon from '/src/assets/Utils/mute-black.svg';
import lightMuteIcon from '/src/assets/Utils/mute-white.svg';
import darkUnmuteIcon from '/src/assets/Utils/unmute-black.svg';
import lightUnmuteIcon from '/src/assets/Utils/unmute-white.svg';
import MaterialUISwitch from './Utils/MaterialUISwitch';
import DehazeIcon from '@mui/icons-material/Dehaze';
import 'styles/Nav.css';

const Nav = () => {
  const { darkMode, setDarkMode, setShowSplash, mute, setMute } =
    useContext(AppContext);
  const [dropdown, setDropdown] = useState(false);

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
            <DehazeIcon
              className='menu-icon'
              onClick={handleMenu}
              ref={menuIconRef}
              id='menu-icon'
              style={{ display: 'none' }}
            />
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
            {/* <MaterialUISwitch
              checked={darkMode}
              onChange={handleDarkModeChange}
              className='dark-toggle'
            /> */}
            <img
              src={currentDarkmodeIcon}
              alt='darkmode icon'
              className='dark-toggle'
              onClick={handleDarkModeClick}
            />
            <img
              src={currentSoundIcon}
              alt='mute/unmute icon'
              className='mute-toggle'
              onClick={handleMuteClick}
            />
          </section>
        </main>
        {dropdown && (
          <div className='dropdown-menu' ref={dropdownRef}>
            <div className='dropdown-box'>
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
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
