import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from 'contexts/AppContext';
import Icon from 'utils/Icon';
import 'styles/Utils/ContactFloat.css';

function ContactFloat() {
  const {
    darkMode,
    contactFloat,
    setContactFloat,
    form,
    handleSubmit,
    handleChange,
  } = useContext(AppContext);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const contactRef = useRef(null);

  const handleClickOutside = (event) => {
    if (contactRef.current && !contactRef.current.contains(event.target)) {
      setContactFloat(false);
    }
  };

  const handleContactFloat = (event, value) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setContactFloat(value);
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
          onMouseDown={(event) => handleContactFloat(event, !contactFloat)}
        >
          <h2>CONTACT</h2>
        </div>
      )}
      {contactFloat && (
        <div className='contact-float-content' ref={contactRef}>
          <Icon
            name='x'
            className='close-icon'
            onMouseDown={(event) => handleContactFloat(event, false)}
          ></Icon>
          <h2>CONTACT US</h2>
          <form className='float-form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Your name'
              value={form.name}
              onChange={handleChange}
              required
            />
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
