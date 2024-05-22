import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Location.css';

function Location() {
  const { darkMode } = useContext(AppContext);

  return (
    <>
      <section className='location-container'></section>
    </>
  );
}

export default Location;
