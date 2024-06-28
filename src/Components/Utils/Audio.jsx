import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Title from 'utils/Title';
import Slider from 'utils/Slider';
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
import Tilt from 'react-parallax-tilt';
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
  const { darkMode, mute, setMute, noAlbumImg, artworkOpen } =
    useContext(AppContext);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentNext = !darkMode ? nextWhite : nextBlack;
  const currentPrev = !darkMode ? prevWhite : prevBlack;
  const currentPipe = !darkMode ? pipeWhite : pipeBlack;
  const currentPlay = !darkMode ? playWhite : playBlack;
  const currentPause = !darkMode ? pauseWhite : pauseBlack;
  const currentMute = !darkMode ? muteWhite : muteBlack;
  const currentUnmute = !darkMode ? unmuteWhite : unmuteBlack;
  const currentMuteUnmute = mute ? currentMute : currentUnmute;

  const [scale, setScale] = useState(1.05);

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      const newDuration = audioRef.current.duration;
      setDuration(newDuration);
    }
  };

  useEffect(() => {
    if (audioRef.current && selectedAudio) {
      audioRef.current.load();
      audioRef.current.onloadedmetadata = handleMetadataLoaded;
      audioRef.current.ontimeupdate = handleTimeUpdate;
      console.log('Audio element loaded with src: ', selectedAudio.audio);
    }
  }, [audioIndex, selectedAudio]);

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

  const handleAudioLoad = async () => {
    if (shouldPlay && audioRef.current && selectedAudio) {
      try {
        await audioRef.current.play();
        setAudioPlay(true);
        setShouldPlay(false);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  useEffect(() => {
    if (shouldPlay && audioRef.current && selectedAudio) {
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', handleAudioLoad);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', handleAudioLoad);
      }
    };
  }, [shouldPlay, audioIndex, selectedAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      if (shouldPlay && selectedAudio) {
        handleAudioLoad();
      }
    }
  }, [selectedAudio]);

  const togglePause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlay(false);
    }
  };

  const togglePlay = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlay(true);
      setVideoPlay(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const handlePrev = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (audioRef.current.currentTime > 2) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    } else {
      setProgress(0);
      setAudioPlay(false);
      setAudioIndex(
        (prevIndex) => (prevIndex - 1 + audios.length) % audios.length
      );
      setShouldPlay(true);
      setVideoPlay(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const handleNext = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAudioPlay(false);
    setAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
    setShouldPlay(true);
    setVideoPlay(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(progress) ? 0 : progress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value * audioRef.current.duration) / 100;
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0 && !mute) {
      setMute(true);
    } else if (newVolume > 0 && mute) {
      setMute(false);
    }
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
          <Tilt scale={scale} transitionSpeed={2500}>
            <img
              src={selectedAudio.img || noAlbumImg}
              alt={`${selectedAudio.title} album art`}
              className='audio-detail-img'
              id='audio-detail-img'
              onMouseDown={(event) =>
                artworkOpen(event, selectedAudio.img, selectedAudio.title)
              }
            />
          </Tilt>
          <div className='audio-detail-container' id='audio-detail-container'>
            <div className='audio-detail-text' id='audio-detail-text'>
              <Title selectedAudio={selectedAudio} />
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
              <div
                className='audio-progress-container'
                id='audio-progress-container'
              >
                <div className='audio-progress-numbers'>
                  {formatTime(currentTime)} | {formatTime(duration)}
                </div>
                <div className='audio-progress-slider'>
                  <Slider onChange={handleProgressChange} progress={progress} />
                </div>
              </div>
              <div
                className='audio-controls-container'
                id='audio-controls-container'
              >
                <div className='audio-controls'>
                  {audioPlay ? (
                    <img
                      src={currentPause}
                      alt='pause button'
                      className='audio-play-button'
                      id='audio-play-button'
                      onMouseDown={(event) => togglePause(event)}
                    />
                  ) : (
                    <img
                      src={currentPlay}
                      alt='play button'
                      className='audio-play-button'
                      id='audio-play-button'
                      onMouseDown={(event) => togglePlay(event)}
                    />
                  )}
                  <img
                    src={currentPrev}
                    alt='prev button'
                    className='audio-controls-button'
                    id='audio-controls-button'
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
                    id='audio-controls-button'
                    onMouseDown={(event) => handleNext(event)}
                  />
                  <img
                    src={currentMuteUnmute}
                    alt='mute button'
                    className='audio-controls-button'
                    id='audio-controls-button'
                    onMouseDown={(event) => toggleMute(event)}
                  />
                  <div className='audio-volume'>
                    <Slider onChange={handleVolumeChange} progress={volume} />
                  </div>
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
