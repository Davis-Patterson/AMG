import React, { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import AMGLogoBlack from '/src/assets/Logos/AMG-full-black.png';
import AMGLogoWhite from '/src/assets/Logos/AMG-full-white.png';
import 'styles/Footer.css';

const Footer = ({}) => {
  const { darkMode, setShowSplash, setDropdown } = useContext(AppContext);
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  const navigate = useNavigate();

  const handleFooterClick = (path) => {
    setDropdown(false);
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  return (
    <>
      <footer className='footer-container'>
        <section className='footer-content' id='footer-content'>
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
        </section>
        <section className='footer-link-container'>
          <div
            onClick={() => handleFooterClick('/')}
            className='footer-link'
            id='home-link-footer'
          >
            Home
          </div>
          <div
            onClick={() => handleFooterClick('/news')}
            className='footer-link'
            id='news-link-footer'
          >
            News
          </div>
          <div
            onClick={() => handleFooterClick('/artists')}
            className='footer-link'
            id='artists-link-footer'
          >
            Artists
          </div>
          <div
            onClick={() => handleFooterClick('/about')}
            className='footer-link'
            id='about-link-footer'
          >
            About
          </div>
          <div
            onClick={() => handleFooterClick('/contact')}
            className='footer-link'
            id='contact-button-footer'
          >
            Contact
          </div>
        </section>
        <section className='footer-footer' id='footer-footer'>
          <p className='footer-footer-text'>
            © Copyright 2024. Aurum Management Group.
          </p>
        </section>
        <div className='gap' />
      </footer>
    </>
  );
};

export default Footer;
