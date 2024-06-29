import React, { useContext, useEffect } from 'react';
import { AppContext } from 'contexts/AppContext';
import Tilt from 'react-parallax-tilt';
import 'styles/Utils/Artwork.css';

function Artwork() {
  const { artworkData, artworkClose } = useContext(AppContext);
  const { src, alt, title, artist, album, date, explicit } = artworkData;

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener(
      'keydown',
      (e) => {
        if (
          [
            'ArrowUp',
            'ArrowDown',
            'PageUp',
            'PageDown',
            'Home',
            'End',
          ].includes(e.key)
        ) {
          preventScroll(e);
        }
      },
      { passive: false }
    );

    return () => {
      window.removeEventListener('wheel', preventScroll, { passive: false });
      window.removeEventListener('keydown', preventScroll, { passive: false });
    };
  }, []);

  return (
    <div className='overlay' onMouseDown={(event) => artworkClose(event)}>
      <div className='overlay-content'>
        <Tilt
          scale={1.05}
          transitionSpeed={2500}
          glareEnable={true}
          glareMaxOpacity={0.42}
          className='tilt-container'
        >
          <img src={src} alt={alt} className='overlay-image' />
        </Tilt>
        <div className='artwork-details'>
          {explicit && (
            <div className='artwork-explicit-box'>
              <p className='artwork-explicit-text'>EXPLICIT</p>
            </div>
          )}
          {title && <div className='artwork-title'>{title}</div>}
          {artist && <div className='artwork-artist'>{artist}</div>}
          {album && <div className='artwork-album'>{album}</div>}
          {date && <div className='artwork-date'>{date}</div>}
        </div>
      </div>
    </div>
  );
}

export default Artwork;
