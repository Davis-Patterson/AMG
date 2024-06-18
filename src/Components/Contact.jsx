import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Slideshow from 'utils/Slideshow';
import Banner from 'utils/Banner';
import Locations from 'utils/Locations';
import Email from 'utils/Email';
import 'styles/Contact.css';

function Contact() {
  const { darkMode, contactData, contactIndex, setContactIndex } =
    useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='contact-header' id='about-header'>
          <div
            className='contact-header-gradient-overlay'
            id='contact-header-gradient-overlay'
          />
          <div
            className='contact-header-gradient-overlay'
            id='contact-header-gradient-overlay'
          />
          <section className='contact-header-text-container'>
            <div className='contact-title-container'>
              <h1 className='contact-title' id='contact-title'>
                CONTACT
              </h1>
              <p className='contact-tagline' id='contact-tagline'>
                Send us a message! You can also find us on{' '}
                <a
                  href='https://www.instagram.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='contact-ig-link'
                >
                  Instagram.
                </a>
              </p>
            </div>
          </section>
          <Slideshow
            data={contactData}
            index={contactIndex}
            setIndex={setContactIndex}
            slideClass='contact'
          />
        </header>
        <Banner />
        <Locations />
        <div
          className='contact-content-container'
          id='contact-content-container'
        >
          <div className='contact-content' id='contact-content'>
            <p className='contact-text-title'>Message us:</p>
            <p className='contact-text-disclaimer' id='contact-text-disclaimer'>
              Aurum Management Group (AMG) values its relationships and welcomes
              the opportunity to collaborate with established individuals in the
              music industry. However, please note that AMG and its personnel
              cannot accept or consider any unsolicited recordings, musical
              compositions, or other materials.
            </p>
            <Email />
          </div>
        </div>
        <div className='gap' />
      </main>
    </>
  );
}

export default Contact;
