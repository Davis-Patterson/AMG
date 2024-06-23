import React, { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import nextBlack from 'assets/Utils/next-black.svg';
import nextWhite from 'assets/Utils/next-white.svg';
import prevBlack from 'assets/Utils/prev-black.svg';
import prevWhite from 'assets/Utils/prev-white.svg';
import pauseBlack from 'assets/Utils/pause-black.svg';
import pauseWhite from 'assets/Utils/pause-white.svg';
import playBlack from 'assets/Utils/play-black.svg';
import playWhite from 'assets/Utils/play-white.svg';
import pipeBlack from 'assets/Utils/pipe-black.svg';
import pipeWhite from 'assets/Utils/pipe-white.svg';
import 'styles/Utils/Audio.css';

function Audio({
  selectedAudio,
  audioIndex,
  setAudioIndex,
  audios,
  audioPlay,
  setAudioPlay,
  setVideoPlay,
  mute,
  setMute,
}) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const { darkMode } = useContext(AppContext);

  const currentNext = !darkMode ? nextWhite : nextBlack;
  const currentPrev = !darkMode ? prevWhite : prevBlack;
  const currentPipe = !darkMode ? pipeWhite : pipeBlack;
  const currentPlay = !darkMode ? playWhite : playBlack;
  const currentPause = !darkMode ? pauseWhite : pauseBlack;
  const currentPlayPause = audioPlay ? currentPause : currentPlay;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.muted = mute;
      audioRef.current.volume = volume / 100;
    }
  }, [audioIndex, mute, volume]);

  useEffect(() => {
    if (audioPlay && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioPlay]);

  const togglePlayPause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioPlay(true);
      setVideoPlay(false);
    } else {
      audioRef.current.pause();
      setAudioPlay(false);
    }
  };

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(progress) ? 0 : progress);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (newVolume === '0') {
      setMute(true);
    } else {
      setMute(false);
    }
  };

  const handlePrev = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAudioIndex(
      (prevIndex) => (prevIndex - 1 + audios.length) % audios.length
    );
  };

  const handleNext = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
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
              <input
                type='range'
                value={progress}
                onChange={handleProgressChange}
                className='audio-progress'
              />
              <div className='audio-controls-container'>
                <div className='audio-controls'>
                  <img
                    src={currentPlayPause}
                    alt='play/pause button'
                    className='audio-controls-button'
                    onMouseDown={(event) => togglePlayPause(event)}
                  />
                  <img
                    src={currentPrev}
                    alt='prev button'
                    className='audio-controls-button'
                    onMouseDown={(event) => handlePrev(event)}
                  />
                  <img
                    src={currentPipe}
                    alt='pipe'
                    className='audio-controls-pipe'
                  />
                  <img
                    src={currentNext}
                    alt='next button'
                    className='audio-controls-button'
                    onMouseDown={(event) => handleNext(event)}
                  />
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={volume}
                    onChange={handleVolumeChange}
                    className='audio-volume'
                  />
                </div>
              </div>
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
