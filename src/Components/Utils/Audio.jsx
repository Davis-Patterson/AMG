import React, { useEffect, useContext, useState, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import pauseBlack from 'assets/Utils/pause-black.svg';
import pauseWhite from 'assets/Utils/pause-white.svg';
import playBlack from 'assets/Utils/play-black.svg';
import playWhite from 'assets/Utils/play-white.svg';
import 'styles/Utils/Audio.css';

function Audio({ selectedAudio, audioIndex }) {
  const { darkMode, mute } = useContext(AppContext);
  const audioRef = useRef(null);
  const [audioPlay, setAudioPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioIndex]);

  const togglePlayPause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioPlay(true);
    } else {
      audioRef.current.pause();
      setAudioPlay(false);
    }
  };

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newTime;
  };

  return (
    <>
      {selectedAudio && (
        <div className='audio-selection-header' id='audio-selection-header'>
          <img
            src={selectedAudio.img}
            alt={`${selectedAudio.title} background`}
            className='audio-selection-header-background'
          />
          <div className='audio-selection-header-background-overlay' />
          <img
            src={selectedAudio.img}
            alt={`${selectedAudio.title} album art`}
            className='audio-detail-img'
          />
          <div className='audio-detail-container'>
            <div className='audio-detail-text'>
              <div className='audio-detail-title-container'>
                <div
                  className='audio-detail-title'
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
              <div className='audio-detail-artist'>{selectedAudio.artist}</div>
              <div className='audio-detail-album'>{selectedAudio.album}</div>
              <div className='audio-detail-date'>{selectedAudio.date}</div>
            </div>
            <div className='audio-player-container'>
              <div
                className='audio-control'
                onMouseDown={(event) => togglePlayPause(event)}
              >
                {audioPlay ? 'Pause' : 'Play'}
              </div>
              <input
                type='range'
                value={progress}
                onChange={handleProgressChange}
                className='audio-progress'
              />
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setAudioPlay(false)}
              >
                {selectedAudio.audio.map((source, index) => (
                  <source key={index} src={source.src} type={source.type} />
                ))}
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Audio;
