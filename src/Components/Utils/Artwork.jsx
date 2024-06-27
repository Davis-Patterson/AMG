import React, { useContext, useEffect } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Utils/Artwork.css';

function Artwork() {
  const { artworkSrc, artworkAlt, artworkClose } = useContext(AppContext);

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
        <img src={artworkSrc} alt={artworkAlt} className='overlay-image' />
      </div>
    </div>
  );
}

export default Artwork;
