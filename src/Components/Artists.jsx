import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from '/src/assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/Logos/AMG-full-words-white.png';
import 'styles/Artists.css';

function Artists() {
  const { darkMode } = useContext(AppContext);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  return (
    <>
      <main className='artists-container'>
        <section className='artists-img-container'>
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

export default Artists;
