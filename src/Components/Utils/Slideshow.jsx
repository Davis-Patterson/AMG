import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import Icon from 'utils/Icon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';

const Slideshow = ({ data, index, setIndex, slideClass }) => {
  const {
    isPaused,
    setIsPaused,
    setWasPaused,
    noUserImg,
    handleLinkClick,
    formatTitleForURL,
    artworkOpen,
  } = useContext(AppContext);

  const [progress, setProgress] = useState(0);
  const [maxLength, setMaxLength] = useState(42);

  const autoProg = useCallback(() => {
    if (!isPaused) {
      setProgress(0);
      setIndex((prevIndex) => (prevIndex + 1) % (data.length + 2));
    }
  }, [isPaused, data.length, setIndex]);

  const handlePrev = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setIndex(
      (prevIndex) => (prevIndex - 1 + data.length + 2) % (data.length + 2)
    );
  };

  const handleNext = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setIndex((prevIndex) => (prevIndex + 1) % (data.length + 2));
  };

  const handlePause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setIsPaused(!isPaused);
  };

  const truncateTitle = (title) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
  };

  const handleArtworkOpen = (event, imgSrc, title) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setWasPaused(isPaused);
    setIsPaused(true);

    const artworkDetails = {
      src: imgSrc,
      alt: title,
      title: '',
      artist: title,
      album: '',
      date: '',
      explicit: false,
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) {
        setMaxLength(18);
      } else if (window.innerWidth < 410) {
        setMaxLength(20);
      } else if (window.innerWidth < 460) {
        setMaxLength(25);
      } else if (window.innerWidth < 560) {
        setMaxLength(30);
      } else {
        setMaxLength(42);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (!isPaused && prevProgress < 100) {
          return prevProgress + 1;
        } else {
          return prevProgress;
        }
      });
    }, 100);

    if (progress === 100 && !isPaused) {
      autoProg();
    }

    return () => {
      clearInterval(progressTimer);
    };
  }, [isPaused, progress, autoProg]);

  const getBannerOrImg = (item) => {
    if (item.banner && Array.isArray(item.banner) && item.banner[0]?.img) {
      return item.banner[0]?.img;
    }
    if (item.img && Array.isArray(item.img)) {
      return item.img[0]?.img || item.img;
    }
    return item.banner || item.img || noUserImg;
  };

  const getBannerAlign = (item) => {
    if (item.banner && Array.isArray(item.banner)) {
      return item.banner[0]?.align || 'center';
    }
    return 'center';
  };

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector(
      `.${slideClass}-header-pics-wrapper`
    );
    const titleWrapper = document.querySelector(
      `.${slideClass}-header-pics-title-wrapper`
    );

    if (index === data.length + 1) {
      setIndex(1);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${-100}%)`;
      titleWrapper.style.transform = `translateX(${-100}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    } else if (index === 0) {
      setIndex(data.length);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${-100 * data.length}%)`;
      titleWrapper.style.transform = `translateX(${-100 * data.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  if (!data || data.length === 0) {
    return (
      <>
        <section className='artists-header-pics-container'>
          <Skeleton className='header-skeleton' />
          <div className='circular-progress-container'>
            <CircularProgress
              size={40}
              sx={{
                color: 'var(--clr-dark)',
              }}
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className={`${slideClass}-header-pics-container`}>
        <div
          className={`${slideClass}-header-pics-wrapper`}
          style={{ transform: `translateX(${-100 * index}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            className={`${slideClass}-header-pic-wrapper`}
            onMouseDown={(event) =>
              handleArtworkOpen(
                event,
                getBannerOrImg(data[data.length - 1]),
                data[data.length - 1].title || data[data.length - 1].name
              )
            }
          >
            <img
              src={getBannerOrImg(data[data.length - 1])}
              alt={data[data.length - 1].title || data[data.length - 1].name}
              className={`${slideClass}-header-pic`}
              id={`${slideClass}-header-pic`}
              style={{ objectPosition: getBannerAlign(data[data.length - 1]) }}
              loading='lazy'
            />
          </div>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`${slideClass}-header-pic-wrapper`}
              id={`${slideClass}-header-pic-wrapper`}
              onMouseDown={(event) =>
                handleArtworkOpen(
                  event,
                  getBannerOrImg(item),
                  item.title || item.name
                )
              }
            >
              <img
                src={getBannerOrImg(item)}
                alt={item.title || item.name}
                className={`${slideClass}-header-pic`}
                id={`${slideClass}-header-pic`}
                style={{ objectPosition: getBannerAlign(item) }}
                loading='lazy'
              />
            </div>
          ))}
          <div
            className={`${slideClass}-header-pic-wrapper`}
            onMouseDown={(event) =>
              handleArtworkOpen(
                event,
                getBannerOrImg(data[0]),
                data[0].title || data[0].name
              )
            }
          >
            <img
              src={getBannerOrImg(data[0])}
              alt={data[0].title || data[0].name}
              className={`${slideClass}-header-pic`}
              id={`${slideClass}-header-pic`}
              style={{ objectPosition: getBannerAlign(data[0]) }}
              loading='lazy'
            />
          </div>
        </div>
      </section>
      <section className={`${slideClass}-header-overlays`}>
        <div className={`${slideClass}-header-pic-title-container`}>
          <div
            className={`${slideClass}-header-pics-title-wrapper`}
            style={{ transform: `translateX(${-100 * index}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className={`${slideClass}-header-pic-title-wrapper`}>
              {slideClass === 'artists' || slideClass === 'news' ? (
                <a
                  href={`/${slideClass}/${formatTitleForURL(
                    data[data.length - 1].name || data[data.length - 1].title
                  )}`}
                  onMouseDown={(event) =>
                    handleLinkClick(
                      event,
                      `/${slideClass}/${formatTitleForURL(
                        data[data.length - 1].name ||
                          data[data.length - 1].title
                      )}`
                    )
                  }
                >
                  <p className={`${slideClass}-header-pic-link-title`}>
                    {truncateTitle(
                      data[data.length - 1].title || data[data.length - 1].name
                    )}
                  </p>
                </a>
              ) : (
                <p className={`${slideClass}-header-pic-title`}>
                  {truncateTitle(
                    data[data.length - 1].title || data[data.length - 1].name
                  )}
                </p>
              )}
            </div>
            {data.map((item, idx) => (
              <div
                className={`${slideClass}-header-pic-title-wrapper`}
                key={idx}
              >
                {slideClass === 'artists' || slideClass === 'news' ? (
                  <a
                    href={`/${slideClass}/${formatTitleForURL(
                      item.name || item.title
                    )}`}
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/${slideClass}/${formatTitleForURL(
                          item.name || item.title
                        )}`
                      )
                    }
                  >
                    <p className={`${slideClass}-header-pic-link-title`}>
                      {truncateTitle(item.title || item.name)}
                    </p>
                  </a>
                ) : (
                  <p className={`${slideClass}-header-pic-title`}>
                    {truncateTitle(item.title || item.name)}
                  </p>
                )}
              </div>
            ))}
            <div className={`${slideClass}-header-pic-title-wrapper`}>
              {slideClass === 'artists' || slideClass === 'news' ? (
                <a
                  href={`/${slideClass}/${formatTitleForURL(
                    data[0].name || data[0].title
                  )}`}
                  onMouseDown={(event) =>
                    handleLinkClick(
                      event,
                      `/${slideClass}/${formatTitleForURL(
                        data[0].name || data[0].title
                      )}`
                    )
                  }
                >
                  <p className={`${slideClass}-header-pic-link-title`}>
                    {truncateTitle(data[0].title || data[0].name)}
                  </p>
                </a>
              ) : (
                <p className={`${slideClass}-header-pic-title`}>
                  {truncateTitle(data[0].title || data[0].name)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='controls-container'>
          <div className='controls'>
            <Icon
              name='prev'
              alt='prev button'
              svgClass='controls-button'
              wrapperClass='controls'
              onMouseDown={(event) => handlePrev(event)}
            />
            <Icon
              name='pipe'
              alt='pipe'
              svgClass='controls-pipe'
              wrapperClass='controls'
            />
            <Icon
              name='next'
              alt='next button'
              svgClass='controls-button'
              wrapperClass='controls'
              onMouseDown={(event) => handleNext(event)}
            />
            {isPaused ? (
              <Icon
                name='play'
                alt='play/pause button'
                svgClass='controls-button'
                wrapperClass='controls'
                onMouseDown={(event) => handlePause(event)}
              />
            ) : (
              <Icon
                name='pause'
                alt='play/pause button'
                svgClass='controls-button'
                wrapperClass='controls'
                onMouseDown={(event) => handlePause(event)}
              />
            )}
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
    </>
  );
};

export default Slideshow;
