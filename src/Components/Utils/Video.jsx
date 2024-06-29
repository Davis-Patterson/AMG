import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import Icon from 'utils/Icon';
import 'styles/Utils/Video.css';

function Video({ artist, videoPlay, setVideoPlay, videoRef }) {
  const { darkMode, mute, setMute } = useContext(AppContext);
  const [hovered, setHovered] = useState(false);

  const volumeRef = useRef(videoRef.current ? videoRef.current.volume : 1);

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
                <Icon
                  name='link'
                  alt='link icon'
                  wrapperClass='pointer-icon-container'
                  svgClass='video-title-link-icon'
                />
                <p className='video-title'>{video.title}</p>
                <p className='video-artist'>- {video.artist}</p>
              </a>
            ) : (
              <div className='video-title-artist-container'>
                <Icon
                  name='pointer'
                  alt='pointer icon'
                  svgClass='video-title-indicator'
                  wrapperClass='pointer-icon-container'
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
