import React, { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AMGLogoBlack from 'assets/Logos/AMG-full-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-white.png';
import 'styles/Footer.css';

const Footer = ({}) => {
  const { darkMode, setShowSplash } = useContext(AppContext);
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleFooterClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/artists', label: 'Artists' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <footer className='footer-container'>
        <section className='footer-content' id='footer-content'>
          <div className='footer-logo-container' id='footer-logo-container'>
            <img
              src={currentLogo}
              alt='AMG logo'
              className='footer-logo'
              onClick={() => handleFooterClick('/')}
            />
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
          {links
            .filter((link) => link.path !== currentPath)
            .map((link) => (
              <div
                key={link.path}
                onClick={() => handleFooterClick(link.path)}
                className='footer-link'
                id='footer-link'
              >
                {link.label}
              </div>
            ))}
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
