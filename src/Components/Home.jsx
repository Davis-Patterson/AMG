import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from '/src/assets/logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/logos/AMG-full-words-white.png';
import 'styles/Home.css';

function Home({}) {
  const { darkMode, mute } = useContext(AppContext);
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  return (
    <>
      <main className='home-container'>
        <section className='page-img-container'>
          <img
            src={currentLogo}
            alt='background img'
            className='homepage-logo'
          />
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default Home;
