import React, { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Utils/Artwork.css';

function Artwork() {
  const { artworkSrc, artworkAlt, artworkClose } = useContext(AppContext);

  return (
    <div className='overlay' onMouseDown={(event) => artworkClose(event)}>
      <div className='overlay-content'>
        <img src={artworkSrc} alt={artworkAlt} className='overlay-image' />
      </div>
    </div>
  );
}

export default Artwork;
