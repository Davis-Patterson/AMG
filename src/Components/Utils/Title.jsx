import React, { useState, useEffect } from 'react';
import 'styles/Utils/Title.css';

function Title({ selectedAudio }) {
  return (
    <>
      <div
        className='audio-detail-title-container'
        id='audio-detail-title-container'
      >
        <div
          className='audio-detail-title'
          id='audio-detail-title'
          style={{
            maxWidth: `${selectedAudio.explicit ? '85%' : '100%'}`,
          }}
        >
          {selectedAudio.title}
        </div>
        {selectedAudio.explicit && (
          <div className='explicit-box'>
            <p className='explicit-text'>EXPLICIT</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Title;
