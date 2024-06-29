import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Utils/Locations.css';

function Locations() {
  const { darkMode, locData, artworkOpen } = useContext(AppContext);

  const [locationIndex, setLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locData);
  }, [locData]);

  const handleLocationClick = (event, index) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setLocationIndex(index);
  };

  const handleArtworkOpen = (event, imgSrc, cityName) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const artworkDetails = {
      src: imgSrc,
      alt: cityName,
      title: '',
      artist: cityName,
      album: '',
      date: '',
      explicit: false,
    };

    artworkOpen(
      event,
      artworkDetails.src,
      artworkDetails.alt,
      artworkDetails.title,
      artworkDetails.artist,
      artworkDetails.album,
      artworkDetails.date,
      artworkDetails.explicit
    );
  };

  return (
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
              onMouseDown={(event) =>
                handleArtworkOpen(event, location.img, location.id)
              }
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
                  <div className='indicator-circle' id='indicator-circle'></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Locations;
