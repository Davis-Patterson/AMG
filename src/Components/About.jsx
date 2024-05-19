import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from '/src/assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/Logos/AMG-full-words-white.png';
import 'styles/About.css';

function About() {
  const { darkMode } = useContext(AppContext);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className='about-container'>
        <section className='about-img-container'>
          {/* <img
            src={currentLogo}
            alt='background img'
            className='homepage-logo'
          /> */}
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default About;
