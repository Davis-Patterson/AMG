import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Email.css';

function Email() {
  const {
    darkMode,
    form,
    sending,
    success,
    error,
    handleChange,
    handleSubmit,
  } = useContext(AppContext);

  return (
    <form className='email-form-container' onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        name='name'
        value={form.name}
        placeholder='Your Name'
        onChange={handleChange}
        required
      />
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='YourName@email.com'
        value={form.email}
        onChange={handleChange}
        required
      />
      <label htmlFor='message'>Message</label>
      <textarea
        id='message'
        name='message'
        placeholder='Your Message'
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Email;
