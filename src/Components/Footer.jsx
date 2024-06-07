import React, { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import AMGLogoBlack from 'assets/Logos/AMG-full-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-white.png';
import 'styles/Footer.css';

const Footer = ({}) => {
  const { darkMode, setShowSplash } = useContext(AppContext);
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  const navigate = useNavigate();

  const handleFooterClick = (path) => {
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
          <div className='attribution' id='attribution'>
            <h1 className='footer-name' id='footer-name'>
              AURUM MANAGEMENT GROUP
            </h1>
            <h1 className='footer-subtext' id='footer-subtext'>
              // tagline //
            </h1>
          </div>
        </section>
        <section className='footer-link-container' id='footer-link-container'>
          <div
            onClick={() => handleFooterClick('/')}
            className='footer-link'
            id='footer-link'
          >
            Home
          </div>
          <div
            onClick={() => handleFooterClick('/news')}
            className='footer-link'
            id='footer-link'
          >
            News
          </div>
          <div
            onClick={() => handleFooterClick('/artists')}
            className='footer-link'
            id='footer-link'
          >
            Artists
          </div>
          <div
            onClick={() => handleFooterClick('/about')}
            className='footer-link'
            id='footer-link'
          >
            About
          </div>
          <div
            onClick={() => handleFooterClick('/contact')}
            className='footer-link'
            id='footer-link'
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
