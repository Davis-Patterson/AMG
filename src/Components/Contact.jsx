import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Locations from 'utils/Locations';
import 'styles/Contact.css';
import Email from './Utils/Email';

function Contact() {
  const { darkMode } = useContext(AppContext);

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
          <section className='contact-header-pics-container'>
            <img
              src='https://amgbucket.s3.us-east-2.amazonaws.com/home/ak3s9je.webp'
              alt='contact header img'
              className='contact-header-pics'
            />
          </section>
        </header>
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
