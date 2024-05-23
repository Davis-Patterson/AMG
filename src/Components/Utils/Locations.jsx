import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import nycImg from 'assets/About/nyc-img.jpg';
import londonImg from 'assets/About/london-img.jpg';
import berlinImg from 'assets/About/berlin-img.jpg';
import tokyoImg from 'assets/About/tokyo-img.jpg';
import sydneyImg from 'assets/About/sydney-img.jpg';
import locationsData from 'utilities/Locations.json';
import 'styles/Locations.css';

function Locations() {
  const { darkMode } = useContext(AppContext);

  const [locationIndex, setLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);

  const locationPics = [nycImg, londonImg, berlinImg, tokyoImg, sydneyImg];
  const locationNames = ['New York', 'London', 'Berlin', 'Tokyo', 'Sydney'];

  useEffect(() => {
    setLocations(locationsData);
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
            {locationPics.map((picSrc, index) => (
              <img
                key={index}
                src={picSrc}
                alt='location img'
                className='location-img'
                style={{
                  display: locationIndex === index ? 'block' : 'none',
                }}
              />
            ))}
          </div>
          <div className='location-button-container'>
            {locationNames.map((location, index) => (
              <div
                key={index}
                className={`location-button ${
                  locationIndex === index ? 'selected' : ''
                }`}
                onClick={() => handleLocationClick(index)}
              >
                <p className='location-button-text'>{location}</p>
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
