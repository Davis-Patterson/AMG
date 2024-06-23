import React, { useEffect, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import 'styles/Utils/Video.css';

function Video({ artist, videoPlay, setVideoPlay, videoRef }) {
  const { mute, setMute } = useContext(AppContext);
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
            <div className='video-title-artist-container'>
              <p className='video-title-indicator'>▶</p>
              <p className='video-title'>{video.title}</p>
              <p className='video-artist'>- {video.artist}</p>
            </div>
          </div>
        ))}
    </>
  );
}

export default Video;
