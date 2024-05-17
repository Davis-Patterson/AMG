import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import AMGLogo from '/src/assets/logos/AMG-full-black.png';
import MaterialUISwitch from './Utils/MaterialUISwitch';
import DehazeIcon from '@mui/icons-material/Dehaze';
import './Styles/Nav.css';

const Nav = ({ darkMode, setDarkMode, activeSection, setActiveSection }) => {
  const [dropdown, setDropdown] = useState(false);

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
              <img
                src={AMGLogo}
                alt='headshot logo'
                className='headshot-logo'
              />
            </HashLink>
            <div className='home-button-adjacent'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.linkedin.com/in/davispatterson/'
                className='nav-link'
                id='linkedin-link-nav'
              >
                <img
                  src={linkedinLogo}
                  alt='linkedin logo'
                  className='link-logo'
                />
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/Davis-Patterson'
                className='nav-link'
                id='github-link-nav'
              >
                <img src={githubLogo} alt='github logo' className='link-logo' />
              </a>
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
              to='/#about'
              className={`nav-button ${isActive('about') ? 'active' : ''}`}
              id='about-button-nav'
            >
              About
            </HashLink>
            <HashLink
              smooth
              to='/#projects'
              className={`nav-button ${isActive('projects') ? 'active' : ''}`}
              id='projects-button-nav'
            >
              Projects
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
                to='/#hello'
                onClick={handleDropdown}
                className='dropdown-link'
              >
                Home
              </HashLink>
            </div>
            <div className='dropdown-box'>
              <HashLink
                smooth
                to='/#about'
                onClick={handleDropdown}
                className='dropdown-link'
              >
                About
              </HashLink>
            </div>
            <div className='dropdown-box'>
              <HashLink
                smooth
                to='/#projects'
                onClick={handleDropdown}
                className='dropdown-link'
              >
                Projects
              </HashLink>
            </div>
            <div className='dropdown-box'>
              <HashLink
                smooth
                to='/#contact'
                onClick={handleDropdown}
                className='dropdown-link'
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
