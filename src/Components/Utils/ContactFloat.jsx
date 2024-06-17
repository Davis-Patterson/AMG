import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from 'contexts/AppContext';
import xBlack from 'assets/Utils/[x]-black.svg';
import xWhite from 'assets/Utils/[x]-white.svg';
import 'styles/Utils/ContactFloat.css';

function ContactFloat() {
  const { darkMode, contactFloat, setContactFloat } = useContext(AppContext);

  const [form, setForm] = useState({
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const contactRef = useRef(null);

  const currentX = darkMode ? xWhite : xBlack;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // put client here
    // .then(
    (result) => {
      setSending(false);
      setSuccess(true);
      console.log('Email successfully sent!', result.text);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      setForm({
        user_name: '',
        email: '',
        message: '',
      });
    },
      (error) => {
        setSending(false);
        setError(true);
        console.log('Failed to send email:', error.text);
        setTimeout(() => {
          setError(false);
        }, 3000);
      };
    // );
  };

  const handleClickOutside = (event) => {
    if (contactRef.current && !contactRef.current.contains(event.target)) {
      setContactFloat(false);
    }
  };

  useEffect(() => {
    if (contactFloat) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contactFloat]);

  return (
    <div
      className={`contact-float-container ${contactFloat ? 'expanded' : ''}`}
      id='contact-float-container'
    >
      {!contactFloat && (
        <div
          className='contact-float-button'
          onClick={() => setContactFloat(!contactFloat)}
        >
          <h2>CONTACT</h2>
        </div>
      )}
      {contactFloat && (
        <div className='contact-float-content' ref={contactRef}>
          <img
            src={currentX}
            className='close-icon'
            onClick={() => setContactFloat(false)}
          ></img>
          <h2>CONTACT US</h2>
          <form className='float-form' onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Your email'
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder='Your message'
              name='message'
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type='submit'>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactFloat;
