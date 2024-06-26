import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import Video from 'utils/Video';
import Audio from 'utils/Audio';
import 'styles/Utils/Media.css';

function Media({ artist }) {
  const { noAlbumImg } = useContext(AppContext);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audios, setAudios] = useState([]);
  const [videoPlay, setVideoPlay] = useState(true);
  const [audioPlay, setAudioPlay] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (artist) {
      const newAudios = getAudios(artist);
      setAudios(newAudios);
      setAudioIndex(0);
      setAudioPlay(false);
      setShouldPlay(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
      }
    }
  }, [artist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => {
        if (audioPlay && audioRef.current) {
          audioRef.current.pause();
          setAudioPlay(false);
        }
      };

      videoElement.addEventListener('play', handlePlay);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
      };
    }
  }, [audioPlay]);

  const handleAudioClick = (event, index) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setAudioPlay(false);
    setAudioIndex(index);
    setShouldPlay(true);
    setVideoPlay(false);
  };

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

  const getAudios = (artist) => {
    let audios = [];
    if (artist.audio && artist.audio.length > 0) {
      audios = audios.concat(artist.audio);
    }
    if (artist.featured && artist.featured.length > 0) {
      audios = audios.concat(artist.featured);
    }
    return audios;
  };

  const selectedAudio = audios[audioIndex];

  return (
    <>
      {artist.videos && artist.videos.length > 0 && (
        <section className='artist-content' id='artist-content'>
          <h3 className='section-title'>Video</h3>
          <Video
            artist={artist}
            videoPlay={videoPlay}
            setVideoPlay={setVideoPlay}
            videoRef={videoRef}
          />
        </section>
      )}
      {audios.length > 0 && (
        <section className='artist-content' id='artist-content'>
          <h3 className='section-title'>Audio</h3>
          <Audio
            selectedAudio={selectedAudio}
            audioIndex={audioIndex}
            setAudioIndex={setAudioIndex}
            audios={audios}
            audioPlay={audioPlay}
            setAudioPlay={setAudioPlay}
            setVideoPlay={setVideoPlay}
            videoRef={videoRef}
            audioRef={audioRef}
            shouldPlay={shouldPlay}
            setShouldPlay={setShouldPlay}
          />
          <ul className='audio-list'>
            {audios.map((audio, index) => (
              <li
                key={index}
                className={
                  audioIndex === index
                    ? 'audio-list-selected'
                    : 'audio-list-item'
                }
                id='audio-list-item'
                onMouseDown={(event) => handleAudioClick(event, index)}
              >
                <img
                  src={audio.img || noAlbumImg}
                  alt={`${audio.title} album art`}
                  className='audio-list-art'
                />
                <div className='audio-list-text'>
                  <div className='audio-list-title-container'>
                    <div
                      className='audio-list-title'
                      style={{
                        maxWidth: `${audio.explicit ? '80%' : '100%'}`,
                      }}
                    >
                      {audio.title}
                    </div>
                    {audio.explicit && (
                      <div className='explicit-box'>
                        <p className='explicit-text'>EXPLICIT</p>
                      </div>
                    )}
                  </div>
                  <div className='audio-list-artist'>{audio.artist}</div>
                  <div className='audio-list-album'>{audio.album}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default Media;
