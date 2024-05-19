import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import AMGLogoBlack from '/src/assets/logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/logos/AMG-full-words-white.png';
import 'styles/Splash.css';

function Splash({}) {
  const { darkMode, showSplash } = useContext(AppContext);

  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;
  const [isVisible, setIsVisible] = useState(showSplash);

  useEffect(() => {
    let timeout;
    if (showSplash) {
      setIsVisible(true);
    } else {
      timeout = setTimeout(() => setIsVisible(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [showSplash]);

  return (
    isVisible && (
      <main
        className={`splash-container ${showSplash ? 'fade-in' : 'fade-out'}`}
      >
        <img src={currentLogo} alt='splashpage img' className='splash-logo' />
      </main>
    )
  );
}

export default Splash;
