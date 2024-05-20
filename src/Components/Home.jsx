import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from 'assets/Logos/AMG-full-words-black.png';
import AMGLogoWhite from 'assets/Logos/AMG-full-words-white.png';
import OfficeStock from 'assets/Home/office-stock.jpg';
import 'styles/Home.css';

function Home({}) {
  const { darkMode, mute } = useContext(AppContext);
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className='page-container' id='page-container'>
        <section className='office-img-container'>
          <img src={OfficeStock} alt='office img' className='office-stock' />
        </section>
        {/* <section className='page-img-container'>
          <img
            src={currentLogo}
            alt='background img'
            className='homepage-logo'
          />
        </section> */}
        <div className='gap' />
      </main>
    </>
  );
}

export default Home;
