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
import xBlack from 'assets/Utils/x-black.svg';
import xWhite from 'assets/Utils/x-white.svg';
import DehazeIcon from '@mui/icons-material/Dehaze';
import 'styles/Nav.css';

const Nav = () => {
  const {
    darkMode,
    setDarkMode,
    setShowSplash,
    mute,
    setMute,
    menu,
    setMenu,
    setOpenDropdown,
  } = useContext(AppContext);
  const [isTop, setIsTop] = useState(true);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;
  const currentDarkmodeIcon = darkMode ? darkmodeIcon : lightmodeIcon;

  const currentMuteIcon = darkMode ? lightMuteIcon : darkMuteIcon;
  const currentUnmuteIcon = darkMode ? lightUnmuteIcon : darkUnmuteIcon;
  const currentSoundIcon = mute ? currentMuteIcon : currentUnmuteIcon;

  const currentX = darkMode ? xWhite : xBlack;

  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const navigate = useNavigate();

  const handleNavClick = (path) => {
    setShowSplash(true);
    setMenu(false);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuIconRef.current &&
        (menuIconRef.current === event.target ||
          menuIconRef.current.contains(event.target))
      ) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }

    if (menu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menu]);

  const handleDarkModeClick = (event) => {
    setDarkMode(!darkMode);
  };

  const handleMuteClick = (event) => {
    setMute(!mute);
  };

  const handleMenu = () => {
    setMenu(!menu);
    setOpenDropdown(null);
    document.body.classList.remove('menu-open');
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
      <nav
        className={`nav-container ${isTop ? 'transparent' : ''}`}
        id='nav-container'
      >
        <main className='nav-contents'>
          <section className='home-button-container'>
            <div onClick={() => handleNavClick('/')} className='home-button'>
              <img
                src={currentLogo}
                alt='AMG logo'
                className='AMG-logo-nav'
                id='AMG-logo-nav'
              />
            </div>
            <div className='home-button-adjacent'></div>
          </section>
          <section className='nav-buttons-container' id='nav-buttons-container'>
            <div
              onClick={() => handleNavClick('/news')}
              className='nav-button'
              id='nav-button'
            >
              News
            </div>
            <div
              onClick={() => handleNavClick('/artists')}
              className='nav-button'
              id='nav-button'
            >
              Artists
            </div>
            <div
              onClick={() => handleNavClick('/about')}
              className='nav-button'
              id='nav-button'
            >
              About
            </div>
            <div
              onClick={() => handleNavClick('/contact')}
              className='nav-button'
              id='nav-button'
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
            <div className='nav-menu-toggle' id='nav-menu-toggle'>
              {!menu && (
                <DehazeIcon
                  className='menu-icon'
                  onClick={handleMenu}
                  ref={menuIconRef}
                  id='menu-icon'
                />
              )}
              {menu && (
                <img
                  src={currentX}
                  className='menu-close-icon'
                  id='menu-close-icon'
                  onClick={handleMenu}
                  ref={menuIconRef}
                />
              )}
            </div>
          </section>
        </main>
      </nav>
    </>
  );
};

export default Nav;
