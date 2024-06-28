import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import pointerBlack from 'assets/Utils/pointer-black.svg';
import pointerWhite from 'assets/Utils/pointer-white.svg';
import linkBlack from 'assets/Utils/link-black.svg';
import linkWhite from 'assets/Utils/link-white.svg';
import linkAccent from 'assets/Utils/link-accent.svg';
import 'styles/Utils/Video.css';

function Video({ artist, videoPlay, setVideoPlay, videoRef }) {
  const { darkMode, mute, setMute } = useContext(AppContext);
  const [hovered, setHovered] = useState(false);

  const volumeRef = useRef(videoRef.current ? videoRef.current.volume : 1);

  const currentPointer = darkMode ? pointerWhite : pointerBlack;
  const currentLink = darkMode ? linkWhite : linkBlack;
  const hoveredLink = hovered ? linkAccent : currentLink;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVolumeChange = () => {
        const isMuted = videoElement.muted || videoElement.volume === 0;
        setMute(isMuted);
        volumeRef.current = videoElement.volume;
      };

      const handlePause = () => {
        setVideoPlay(false);
      };

      const handlePlay = () => {
        setVideoPlay(true);
      };

      videoElement.addEventListener('volumechange', handleVolumeChange);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('play', handlePlay);

      return () => {
        videoElement.removeEventListener('volumechange', handleVolumeChange);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('play', handlePlay);
      };
    }
  }, [setMute, setVideoPlay, videoRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      if (videoPlay) {
        videoRef.current
          .play()
          .catch((error) => console.error('Error playing video:', error));
      }
    }
  }, [artist]);

  return (
    <>
      {artist &&
        artist.videos.map((video, index) => (
          <div key={index} className='video-container'>
            <video
              ref={videoRef}
              className='artist-video'
              autoPlay={videoPlay}
              muted={mute}
              controls
            >
              {video.videoSources.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
              ))}
              Your browser does not support the video tag.
            </video>
            {video.link ? (
              <a
                href={video.link}
                target='_blank'
                rel='noopener noreferrer'
                className='video-title-artist-link-container'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={hoveredLink}
                  alt='link icon'
                  className='video-title-link-icon'
                />
                <p className='video-title'>{video.title}</p>
                <p className='video-artist'>- {video.artist}</p>
              </a>
            ) : (
              <div className='video-title-artist-container'>
                <img
                  src={currentPointer}
                  alt='pointer icon'
                  className='video-title-indicator'
                />
                <p className='video-title'>{video.title}</p>
                <p className='video-artist'>- {video.artist}</p>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default Video;
