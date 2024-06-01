import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Locations.css';

function Locations() {
  const { darkMode, locData } = useContext(AppContext);

  const [locationIndex, setLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locData);
  }, []);

  const handleLocationClick = (index) => {
    setLocationIndex(index);
  };

  return (
    <>
      <section className='location-container'>
        <div className='about-location'>
          <div className='location-text-container'>
            <p className='location-text-title'>LOCATIONS</p>
            <p className='location-text'>
              {locations[locationIndex] ? locations[locationIndex].desc : ''}
            </p>
          </div>
          <div className='location-img-container'>
            <div className='location-gradient' />
            {locations.map((location, index) => (
              <img
                key={index}
                src={location.img}
                alt={`${location.id} img`}
                className='location-img'
                style={{
                  display: locationIndex === index ? 'block' : 'none',
                }}
              />
            ))}
          </div>
          <div className='location-button-container'>
            {locations.map((location, index) => (
              <div
                key={index}
                className={`location-button ${
                  locationIndex === index ? 'selected' : ''
                }`}
                onClick={() => handleLocationClick(index)}
              >
                <p className='location-button-text'>{location.id}</p>
                {locationIndex === index && (
                  <div className='indicator'>
                    <div className='indicator-line'></div>
                    <div className='indicator-circle'></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Locations;
