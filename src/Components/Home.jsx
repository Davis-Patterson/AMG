import React, { useEffect } from 'react';
import AMGLogoBlack from '/src/assets/logos/AMG-full-words-black.png';
import AMGLogoWhite from '/src/assets/logos/AMG-full-words-white.png';
import 'styles/Home.css';

function Home({ darkMode, activeSection, setActiveSection }) {
  const currentLogo = darkMode ? AMGLogoWhite : AMGLogoBlack;

  useEffect(() => {
    if (activeSection) {
      window.history.pushState(null, null, `#${activeSection}`);
    }
  }, [activeSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='home-container'>
        <div className='page-img-container'>
          <img
            src={currentLogo}
            alt='background img'
            className='homepage-logo'
          />
        </div>
        <div className='gap' />
      </div>
    </>
  );
}

export default Home;
