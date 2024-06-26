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
import muteBlack from 'assets/Utils/mute-circle-black.svg';
import muteWhite from 'assets/Utils/mute-circle-white.svg';
import unmuteBlack from 'assets/Utils/unmute-circle-black.svg';
import unmuteWhite from 'assets/Utils/unmute-circle-white.svg';
import pipeBlack from 'assets/Utils/pipe-black.svg';
import pipeWhite from 'assets/Utils/pipe-white.svg';
import 'styles/Utils/Audio.css';

function Audio({
  selectedAudio,
  audioIndex,
  setAudioIndex,
  audios,
  audioPlay,
  audioRef,
  setAudioPlay,
  setVideoPlay,
  videoRef,
  shouldPlay,
  setShouldPlay,
}) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { darkMode, mute, setMute, noAlbumImg } = useContext(AppContext);

  const currentNext = !darkMode ? nextWhite : nextBlack;
  const currentPrev = !darkMode ? prevWhite : prevBlack;
  const currentPipe = !darkMode ? pipeWhite : pipeBlack;
  const currentPlay = !darkMode ? playWhite : playBlack;
  const currentPause = !darkMode ? pauseWhite : pauseBlack;
  const currentMute = !darkMode ? muteWhite : muteBlack;
  const currentUnmute = !darkMode ? unmuteWhite : unmuteBlack;
  const currentMuteUnmute = mute ? currentMute : currentUnmute;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, [audioIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = mute;
    }
  }, [mute]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleAudioLoad = () => {
    if (shouldPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setAudioPlay(true);
          setShouldPlay(false);
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    }
  };

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', handleAudioLoad);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', handleAudioLoad);
      }
    };
  }, [shouldPlay, audioIndex]);

  const togglePause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    audioRef.current.pause();
    setAudioPlay(false);
  };

  const togglePlay = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    audioRef.current.play();
    setAudioPlay(true);
    setVideoPlay(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(progress) ? 0 : progress);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
    if (newVolume === 0 && !mute) {
      setMute(true);
    } else if (newVolume > 0 && mute) {
      setMute(false);
    }
  };

  const handlePrev = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAudioPlay(false);
    setAudioIndex(
      (prevIndex) => (prevIndex - 1 + audios.length) % audios.length
    );
    setShouldPlay(true);
  };

  const handleNext = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAudioPlay(false);
    setAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
    setShouldPlay(true);
  };

  const toggleMute = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setMute(!mute);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      {selectedAudio && (
        <div className='audio-selection-header' id='audio-selection-header'>
          <img
            src={selectedAudio.img || noAlbumImg}
            alt={`${selectedAudio.title} background`}
            className='audio-selection-header-background'
          />
          <div className='audio-selection-header-background-overlay' />
          <img
            src={selectedAudio.img || noAlbumImg}
            alt={`${selectedAudio.title} album art`}
            className='audio-detail-img'
            id='audio-detail-img'
          />
          <div className='audio-detail-container' id='audio-detail-container'>
            <div className='audio-detail-text' id='audio-detail-text'>
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
              <div className='audio-detail-artist' id='audio-detail-artist'>
                {selectedAudio.artist}
              </div>
              <div className='audio-detail-album' id='audio-detail-album'>
                {selectedAudio.album}
              </div>
              <div className='audio-detail-date' id='audio-detail-date'>
                {selectedAudio.date}
              </div>
            </div>
            <div className='audio-player-container'>
              <div className='audio-progress-container'>
                <div className='audio-progress-numbers'>
                  {formatTime(currentTime)} | {formatTime(duration)}
                </div>
                <input
                  type='range'
                  value={progress}
                  onChange={handleProgressChange}
                  className='audio-progress'
                  id='audio-progress'
                />
              </div>
              <div className='audio-controls-container'>
                <div className='audio-controls'>
                  {audioPlay ? (
                    <img
                      src={currentPause}
                      alt='pause button'
                      className='audio-controls-button'
                      onMouseDown={(event) => togglePause(event)}
                    />
                  ) : (
                    <img
                      src={currentPlay}
                      alt='play button'
                      className='audio-controls-button'
                      onMouseDown={(event) => togglePlay(event)}
                    />
                  )}
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
                  <img
                    src={currentMuteUnmute}
                    alt='mute button'
                    className='audio-controls-button'
                    onMouseDown={(event) => toggleMute(event)}
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
