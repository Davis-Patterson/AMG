import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import Icon from 'utils/Icon';
import Title from 'utils/Title';
import Slider from 'utils/Slider';
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
  const [progress, setAudioProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [loop, setLoop] = useState('none');

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
      setAudioProgress(0);
      setCurrentTime(0);
      setDuration(0);
      if (shouldPlay && selectedAudio) {
        handleAudioLoad();
      }
    }
  }, [selectedAudio]);

  const handleLoop = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (loop === 'none') {
      setLoop('loop');
    } else if (loop === 'loop') {
      setLoop('one');
    } else {
      setLoop('none');
    }
  };

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
      setAudioProgress(0);
    } else {
      setAudioProgress(0);
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
    setAudioProgress(0);
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
      setAudioProgress(isNaN(progress) ? 0 : progress);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('pause', () => setAudioPlay(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('pause', () =>
          setAudioPlay(false)
        );
      }
    };
  }, [audioRef]);

  const handleEnded = () => {
    if (loop === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (loop === 'loop') {
      setAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
      setShouldPlay(true);
    } else {
      setAudioPlay(false);
    }
  };

  const handleArtworkOpen = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const artworkDetails = {
      src: selectedAudio.img || noAlbumImg,
      alt: selectedAudio.title,
      ...(selectedAudio.title && { title: selectedAudio.title }),
      ...(selectedAudio.artist && { artist: selectedAudio.artist }),
      ...(selectedAudio.album && { album: selectedAudio.album }),
      ...(selectedAudio.date && { date: selectedAudio.date }),
      ...(selectedAudio.explicit && { explicit: true }),
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
    <>
      {selectedAudio && (
        <div className='audio-selection-header' id='audio-selection-header'>
          <img
            src={selectedAudio.img || noAlbumImg}
            alt={`${selectedAudio.title} background`}
            className='audio-selection-header-background'
          />
          <div className='audio-selection-header-background-overlay' />
          <Tilt
            scale={1.05}
            transitionSpeed={2500}
            glareEnable={true}
            glareMaxOpacity={0.65}
            className='tilt-container'
            perspective={1000}
            // tiltReverse={true}
            // glareReverse={true}
          >
            <img
              src={selectedAudio.img || noAlbumImg}
              alt={`${selectedAudio.title} album art`}
              className='audio-detail-img'
              id='audio-detail-img'
              onMouseDown={handleArtworkOpen}
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
            <div className='audio-player-container' id='audio-player-container'>
              <div
                className='audio-progress-container'
                id='audio-progress-container'
              >
                <div className='audio-progress-numbers'>
                  {formatTime(currentTime)} | {formatTime(duration)}
                </div>
                <div className='audio-progress-slider'>
                  <Slider
                    onChange={handleProgressChange}
                    progress={progress}
                    type='progress'
                  />
                </div>
              </div>
              <div
                className='audio-controls-container'
                id='audio-controls-container'
              >
                <div className='audio-controls'>
                  {loop === 'none' ? (
                    <Icon
                      name='loop-none'
                      alt='no loop button'
                      svgClass='audio-loop-button'
                      id='audio-loop-button'
                      onMouseDown={(event) => handleLoop(event)}
                    />
                  ) : loop === 'one' ? (
                    <Icon
                      name='loop-one'
                      alt='loop once button'
                      svgClass='audio-loop-button'
                      id='audio-loop-button'
                      onMouseDown={(event) => handleLoop(event)}
                    />
                  ) : (
                    <Icon
                      name='loop'
                      alt='loop button'
                      svgClass='audio-loop-button'
                      id='audio-loop-button'
                      onMouseDown={(event) => handleLoop(event)}
                    />
                  )}
                  <Icon
                    name='prev'
                    alt='prev button'
                    svgClass='audio-controls-button'
                    id='audio-controls-button'
                    onMouseDown={(event) => handlePrev(event)}
                  />
                  {audioPlay ? (
                    <Icon
                      name='pause'
                      alt='pause button'
                      svgClass='audio-play-button'
                      id='audio-play-button'
                      onMouseDown={(event) => togglePause(event)}
                    />
                  ) : (
                    <Icon
                      name='play'
                      alt='play button'
                      svgClass='audio-play-button'
                      id='audio-play-button'
                      onMouseDown={(event) => togglePlay(event)}
                    />
                  )}
                  <Icon
                    name='next'
                    alt='next button'
                    svgClass='audio-controls-button'
                    id='audio-controls-button'
                    onMouseDown={(event) => handleNext(event)}
                  />
                  {mute ? (
                    <Icon
                      name='mute-circle'
                      alt='mute button'
                      svgClass='audio-controls-button'
                      id='audio-controls-button'
                      onMouseDown={(event) => toggleMute(event)}
                    />
                  ) : (
                    <Icon
                      name='unmute-circle'
                      alt='unmute button'
                      svgClass='audio-controls-button'
                      id='audio-controls-button'
                      onMouseDown={(event) => toggleMute(event)}
                    />
                  )}
                </div>
                <div className='audio-volume' id='audio-volume'>
                  <Slider
                    onChange={handleVolumeChange}
                    progress={volume}
                    type='volume'
                  />
                </div>
              </div>
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
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
