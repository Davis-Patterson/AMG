import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import Icon from 'utils/Icon';
import AMGLogoBlack from 'assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-words-white.png';
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
    setContactFloat,
    setIsPaused,
  } = useContext(AppContext);
  const [isTop, setIsTop] = useState(true);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (event, path) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setShowSplash(true);
    setMenu(false);
    setContactFloat(false);
    setIsPaused(false);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && location !== '/') {
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
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setDarkMode(!darkMode);
  };

  const handleMuteClick = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setMute(!mute);
  };

  const handleMenu = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
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
            <a
              href='/'
              onMouseDown={(event) => handleNavClick(event, '/')}
              className='home-button'
            >
              <img
                src={currentLogo}
                alt='AMG logo'
                className='AMG-logo-nav'
                id='AMG-logo-nav'
              />
            </a>
            <div className='home-button-adjacent'></div>
          </section>
          <section className='nav-buttons-container' id='nav-buttons-container'>
            <a
              href='/news'
              onMouseDown={(event) => handleNavClick(event, '/news')}
              className='nav-button'
              id='nav-button'
            >
              News
            </a>
            <a
              href='/artists'
              onMouseDown={(event) => handleNavClick(event, '/artists')}
              className='nav-button'
              id='nav-button'
            >
              Artists
            </a>
            <a
              href='/about'
              onMouseDown={(event) => handleNavClick(event, '/about')}
              className='nav-button'
              id='nav-button'
            >
              About
            </a>
            <a
              href='/contact'
              onMouseDown={(event) => handleNavClick(event, '/contact')}
              className='nav-button'
              id='nav-button'
            >
              Contact
            </a>
            <div className='icon-container'>
              <div ref={menuIconRef}>
                {darkMode ? (
                  <Icon
                    name='darkmode'
                    alt='darkmode icon'
                    svgClass='dark-toggle'
                    wrapperClass='icon-container'
                    id='dark-toggle'
                    onMouseDown={handleDarkModeClick}
                  />
                ) : (
                  <Icon
                    name='lightmode'
                    alt='darkmode icon'
                    svgClass='dark-toggle'
                    wrapperClass='icon-container'
                    id='dark-toggle'
                    onMouseDown={handleDarkModeClick}
                  />
                )}
              </div>
              <div ref={menuIconRef}>
                {mute ? (
                  <Icon
                    name='mute'
                    alt='mute/unmute icon'
                    svgClass='mute-toggle'
                    wrapperClass='icon-container'
                    id='mute-toggle'
                    onMouseDown={handleMuteClick}
                  />
                ) : (
                  <Icon
                    name='unmute'
                    alt='mute/unmute icon'
                    svgClass='mute-toggle'
                    wrapperClass='icon-container'
                    id='mute-toggle'
                    onMouseDown={handleMuteClick}
                  />
                )}
              </div>
            </div>
            <div className='nav-menu-toggle' id='nav-menu-toggle'>
              {!menu && (
                <DehazeIcon
                  className='menu-icon'
                  onMouseDown={(event) => handleMenu(event)}
                  ref={menuIconRef}
                  id='menu-icon'
                />
              )}
              {menu && (
                <Icon
                  name='x'
                  svgClass='menu-close-icon'
                  wrapperClass='nav-menu-toggle'
                  wrapperId='nav-menu-toggle'
                  id='menu-close-icon'
                  onMouseDown={handleMenu}
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
