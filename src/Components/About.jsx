import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
import Locations from 'utils/Locations';
import Email from 'utils/Email';
import Slideshow from 'utils/Slideshow';
import skylineImg from 'assets/About/skyline.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/About.css';

function About() {
  const { darkMode, studioData, aboutPicIndex, setAboutPicIndex } =
    useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAboutPicIndex(1);
  }, [setAboutPicIndex]);

  if (!studioData || studioData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='about-header' id='about-header'>
            <div className='about-header-gradient-overlay' />
            <section className='about-header-text-container'>
              <div className='about-brand-container'>
                <h1 className='about-brand-title'>WHO WE ARE</h1>
                <p className='about-tagline'>
                  A collective of music lovers, inspired entrepreneurs,
                  game-changing creatives and passionate teams.
                </p>
              </div>
            </section>
            <section className='about-header-pics-container'>
              <Skeleton
                className='header-skeleton'
                width={'100%'}
                height={'100vh'}
                style={{ display: 'block' }}
              />
            </section>
          </header>
          <Banner />
          <section className='loading-content-container'>
            <div className='loading-content'>
              <div className='loading-text-container'>
                <h2 className='loading-text'>LOADING</h2>
                <CircularProgress
                  size={22}
                  sx={{ color: 'var(--clr-text)', marginLeft: '2px' }}
                />
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
                <Skeleton className='skeleton' />
              </div>
            </div>
          </section>
          <div className='gap' />
        </main>
      </>
    );
  }

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='about-header' id='about-header'>
          <div className='about-header-gradient-overlay' />
          <section className='about-header-text-container'>
            <div className='about-brand-container'>
              <h1 className='about-brand-title'>WHO WE ARE</h1>
              <p className='about-tagline'>
                A collective of music lovers, inspired entrepreneurs,
                game-changing creatives and passionate teams.
              </p>
            </div>
          </section>
          <Slideshow
            data={studioData}
            index={aboutPicIndex}
            setIndex={setAboutPicIndex}
            slideClass='about'
          />
        </header>
        <Banner />
        <section className='about-content-container'>
          <div className='about-content'>
            <div className='about-img-container'>
              <div className='about-gradient' />
              <img src={skylineImg} alt='about pic' className='about-img' />
            </div>
            <div className='about-text-container'>
              <p className='about-text-title'>ABOUT US</p>
              <p className='about-text'>
                We believe in creating workplace experiences that foster
                original thinking, encourage collaboration, and promote career
                growth.
              </p>
              <p className='about-text'>
                Striving to become a more ethical, equitable, and
                environmentally sustainable company is imperative to us, and
                important to our long-term creative and commercial success.
              </p>
              <p className='about-text'>
                It’s the universal language. It inspires us, moves us, thrills
                us, heals us and ultimately unites us all. As the world’s
                leading music company, it’s our responsibility to nurture music,
                and to foster artistry and self-expression. In a world that
                desperately needs to find more common ground, there is no better
                way to provide it, than through music.
              </p>
            </div>
          </div>
        </section>
        <Locations />
        <div className='about-contact-container'>
          <div className='about-contact-content'>
            <p className='about-contact-text-title'>Contact us:</p>
            <Email />
          </div>
        </div>
        <div className='gap' />
      </main>
    </>
  );
}

export default About;
