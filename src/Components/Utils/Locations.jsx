import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Utils/Locations.css';

function Locations() {
  const { darkMode, locData } = useContext(AppContext);

  const [locationIndex, setLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locData);
  }, []);

  const handleLocationClick = (event, index) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setLocationIndex(index);
  };

  return (
    <>
      <section className='location-container'>
        <div className='about-location' id='about-location'>
          <div className='location-text-container' id='location-text-container'>
            <p className='location-text-title' id='location-text-title'>
              LOCATIONS
            </p>
            <p className='location-text' id='location-text'>
              {locations[locationIndex] ? locations[locationIndex].desc : ''}
            </p>
          </div>
          <div className='location-img-container' id='location-img-container'>
            <div className='location-gradient' id='location-gradient' />
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
          <div
            className='location-button-container'
            id='location-button-container'
          >
            {locations.map((location, index) => (
              <div
                key={index}
                className={`location-button ${
                  locationIndex === index ? 'selection' : ''
                }`}
                id={`${locationIndex === index ? 'selection' : ''}`}
                onMouseDown={(event) => handleLocationClick(event, index)}
              >
                {location.id}
                {locationIndex === index && (
                  <div className='indicator' id='indicator'>
                    <div className='indicator-line' id='indicator-line'></div>
                    <div
                      className='indicator-circle'
                      id='indicator-circle'
                    ></div>
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
