import React, { useEffect, useContext } from 'react';
import { AppContext } from '@contexts/AppContext';
import AMGLogoBlack from '@assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from '@assets/Logos/AMG-full-words-white.png';
import '@styles/News.css';

function News() {
  const { darkMode } = useContext(AppContext);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className='news-container'>
        <section className='news-img-container'>
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

export default News;
