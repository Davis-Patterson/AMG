import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import AMGLogoBlack from '/src/assets/logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/logos/AMG-full-words-white.png';
import MaterialUISwitch from './Utils/MaterialUISwitch';
import DehazeIcon from '@mui/icons-material/Dehaze';
import 'styles/Nav.css';

const Nav = ({ darkMode, setDarkMode, activeSection, setActiveSection }) => {
  const [dropdown, setDropdown] = useState(false);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  const dropdownRef = useRef(null);
  const menuIconRef = useRef(null);

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

  const isActive = (sectionId) => {
    const currentSection = activeSection || 'home';
    return currentSection === sectionId;
  };

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleMenu = () => {
    setDropdown(!dropdown);
  };

  const handleDropdown = () => {
    setDropdown(false);
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
        <div className='nav-contents'>
          <div className='home-button-container'>
            <HashLink smooth to='/#home' className='home-button'>
              <img src={currentLogo} alt='AMG logo' className='AMG-logo-nav' />
            </HashLink>
            <div className='home-button-adjacent'>
              <MaterialUISwitch
                checked={darkMode}
                onChange={handleDarkModeChange}
                className='dark-toggle'
              />
            </div>
          </div>
          <div className='nav-buttons-container' id='nav-buttons-container'>
            <DehazeIcon
              className='menu-icon'
              onClick={handleMenu}
              ref={menuIconRef}
              id='menu-icon'
              style={{ display: 'none' }}
            />
            <HashLink
              smooth
              to='/#home'
              className={`nav-button ${isActive('home') ? 'active' : ''}`}
              id='home-button-nav'
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to='/#news'
              className={`nav-button ${isActive('news') ? 'active' : ''}`}
              id='news-button-nav'
            >
              News
            </HashLink>
            <HashLink
              smooth
              to='/#artists'
              className={`nav-button ${isActive('artists') ? 'active' : ''}`}
              id='artists-button-nav'
            >
              Artists
            </HashLink>
            <HashLink
              smooth
              to='/#about'
              className={`nav-button ${isActive('about') ? 'active' : ''}`}
              id='about-button-nav'
            >
              About
            </HashLink>
            <HashLink
              smooth
              to='/#contact'
              className={`nav-button ${isActive('contact') ? 'active' : ''}`}
              id='contact-button-nav'
            >
              Contact
            </HashLink>
          </div>
        </div>
        {dropdown && (
          <div className='dropdown-menu' ref={dropdownRef}>
            <div className='dropdown-box'>
              <HashLink
                smooth
                to='/#home'
                className={`nav-button ${isActive('home') ? 'active' : ''}`}
                id='home-button-nav'
              >
                Home
              </HashLink>
              <HashLink
                smooth
                to='/#news'
                className={`nav-button ${isActive('news') ? 'active' : ''}`}
                id='news-button-nav'
              >
                News
              </HashLink>
              <HashLink
                smooth
                to='/#artists'
                className={`nav-button ${isActive('artists') ? 'active' : ''}`}
                id='artists-button-nav'
              >
                Artists
              </HashLink>
              <HashLink
                smooth
                to='/#about'
                className={`nav-button ${isActive('about') ? 'active' : ''}`}
                id='about-button-nav'
              >
                About
              </HashLink>
              <HashLink
                smooth
                to='/#contact'
                className={`nav-button ${isActive('contact') ? 'active' : ''}`}
                id='contact-button-nav'
              >
                Contact
              </HashLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
