import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import Video from 'utils/Video';
import Audio from 'utils/Audio';
import 'styles/Utils/Media.css';

function Media({ artist }) {
  const { noAlbumImg, formatTitleForURL } = useContext(AppContext);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audios, setAudios] = useState([]);
  const [videoPlay, setVideoPlay] = useState(true);
  const [audioPlay, setAudioPlay] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const audioSectionRef = useRef(null); // Add a ref for the Audio section

  useEffect(() => {
    if (artist) {
      const newAudios = getAudios(artist);
      setAudios(newAudios);
      const hash = window.location.hash.slice(1);
      const audioIndexFromURL = newAudios.findIndex(
        (audio) => formatTitleForURL(audio.title) === hash
      );

      if (audioIndexFromURL !== -1) {
        setAudioIndex(audioIndexFromURL);
        setAudioPlay(false);
        setShouldPlay(true);
        setVideoPlay(false);
      } else {
        setAudioIndex(0);
        setAudioPlay(false);
        setShouldPlay(false);
        setVideoPlay(true);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.load();
        if (audioIndexFromURL === -1) {
          videoRef.current
            .play()
            .catch((error) => console.error('Error playing video:', error));
        }
      }
    }
  }, [artist]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && audioSectionRef.current) {
      audioSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [audios]);

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
    setVideoPlay(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setAudioIndex(index);
    setShouldPlay(true);
    setVideoPlay(false);

    const selectedAudio = audios[index];
    updateURLHash(selectedAudio.title);
  };

  const updateURLHash = (title) => {
    const formattedTitle = formatTitleForURL(title);
    const newUrl = `${window.location.pathname}#${formattedTitle}`;
    window.history.replaceState(null, '', newUrl);
  };

  const handleAudioLoad = () => {
    if (shouldPlay && audioRef.current && selectedAudio) {
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
    audios.sort((a, b) => a.title.localeCompare(b.title));
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
        <section
          className='artist-content'
          id='artist-content'
          ref={audioSectionRef}
        >
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
            handleAudioLoad={handleAudioLoad}
            updateURLHash={updateURLHash}
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
