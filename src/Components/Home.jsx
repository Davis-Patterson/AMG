import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Home.css';

function Home() {
  const {
    darkMode,
    mute,
    homeData,
    setShowSplash,
    homeIndex,
    setHomeIndex,
    formatTitleForURL,
  } = useContext(AppContext);

  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLinkClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const handleVideoProgress = (event) => {
    const video = event.target;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  const handleVideoEnd = () => {
    setProgress(0);

    if (homeIndex < homeData.length - 1) {
      setHomeIndex((prevIndex) => prevIndex + 1);
    } else {
      setHomeIndex(0);
      videoRefs.current.forEach((video) => {
        if (video) video.currentTime = 0;
      });
    }
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[homeIndex];
    if (currentVideo) {
      currentVideo.play();
    }
  }, [homeIndex]);

  if (!homeData || homeData.length === 0) {
    return (
      <main className='page-container' id='page-container'>
        <header className='home-header' id='home-header'>
          <section className='home-header-videos-container'>
            <div className='loading-text-container'>
              <h2 className='loading-text'>LOADING</h2>
              <CircularProgress
                size={22}
                sx={{ color: 'var(--clr-text)', marginLeft: '2px' }}
              />
            </div>
          </section>
        </header>
        <div className='gap' />
      </main>
    );
  }

  return (
    <main className='home-container' id='home-container'>
      <header className='home-display' id='home-header'>
        <section
          className='home-header-videos-container'
          id='home-header-videos-container'
        >
          <div
            className='home-header-videos-wrapper'
            style={{ transform: `translateX(${-100 * homeIndex}%)` }}
            onTransitionEnd={() => {}}
          >
            {homeData.map((item, index) => (
              <div key={index} className='home-header-video-wrapper'>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className='home-header-video'
                  autoPlay
                  muted={mute}
                  onTimeUpdate={handleVideoProgress}
                  onEnded={handleVideoEnd}
                  playsInline
                >
                  <source src={item.videoWebm} type='video/webm' />
                  <source src={item.videoMp4} type='video/mp4' />
                </video>
              </div>
            ))}
          </div>
        </section>
        <section className='home-header-overlays'>
          <div className='home-header-video-title-gradient' />
          <div className='home-header-video-title-container'>
            <div
              className='home-header-videos-title-wrapper'
              style={{ transform: `translateX(${-100 * homeIndex}%)` }}
              onTransitionEnd={() => {}}
            >
              {homeData.map((title, index) => (
                <div
                  className='home-header-video-title-wrapper'
                  key={index}
                  onClick={() =>
                    handleLinkClick(
                      `/artists/${formatTitleForURL(title.artist)}`
                    )
                  }
                >
                  <p className='home-header-video-title'>
                    {title.title} - {title.artist}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className='progress-bar'>
            <div
              className='progress-bar-fill'
              style={{
                width: `${progress}%`,
                transition: progress === 0 ? 'none' : 'width 0.1s linear',
              }}
            ></div>
          </div>
        </section>
      </header>
      <div className='gap' />
    </main>
  );
}

export default Home;
