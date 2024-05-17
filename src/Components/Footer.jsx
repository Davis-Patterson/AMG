import React from 'react';
import { HashLink } from 'react-router-hash-link';
import AMGLogoBlack from '/src/assets/logos/AMG-full-black.png';
import AMGLogoWhite from '/src/assets/logos/AMG-full-white.png';
import 'styles/Footer.css';

const Footer = ({ darkMode, activeSection }) => {
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  const isActive = (sectionId) => {
    const currentSection = activeSection || 'home';
    return currentSection === sectionId;
  };

  return (
    <>
      <div className='footer-container'>
        <div className='footer-content' id='footer-content'>
          <div className='footer-logo-container' id='footer-logo-container'>
            <img src={currentLogo} alt='AMG logo' className='footer-logo' />
          </div>
          <div className='attribution'>
            <h1 className='footer-name' id='footer-name'>
              AURUM MANAGEMENT GROUP
            </h1>
            <h1 className='footer-subtext' id='footer-subtext'>
              // tagline //
            </h1>
          </div>
        </div>
        <div className='footer-link-container'>
          <HashLink
            smooth
            to='/#home'
            className={`footer-link`}
            id='home-button-nav'
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to='/#news'
            className={`footer-link`}
            id='news-button-nav'
          >
            News
          </HashLink>
          <HashLink
            smooth
            to='/#artists'
            className={`footer-link`}
            id='artists-button-nav'
          >
            Artists
          </HashLink>
          <HashLink
            smooth
            to='/#about'
            className={`footer-link`}
            id='about-button-nav'
          >
            About
          </HashLink>
          <HashLink
            smooth
            to='/#contact'
            className={`footer-link`}
            id='contact-button-nav'
          >
            Contact
          </HashLink>
        </div>
        <div className='footer-footer' id='footer-footer'>
          <p className='footer-footer-text'>
            © Copyright 2024. Aurum Management Group.
          </p>
        </div>
        <div className='gap' />
      </div>
    </>
  );
};

export default Footer;
