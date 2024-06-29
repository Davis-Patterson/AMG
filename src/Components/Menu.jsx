import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import Icon from 'utils/Icon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Menu.css';

const Menu = () => {
  const {
    darkMode,
    setDarkMode,
    setShowSplash,
    mute,
    setMute,
    menu,
    setMenu,
    openDropdown,
    setOpenDropdown,
    setContactFloat,
    newsData,
    artistData,
    studioData,
    form,
    noUserImg,
    handleChange,
    handleSubmit,
    formatTitleForURL,
  } = useContext(AppContext);

  const [aboutIndex, setAboutIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [sortedNews, setSortedNews] = useState([]);
  const [sortedArtists, setSortedArtists] = useState([]);

  const newsScrollRef = useRef(null);
  const artistsScrollRef = useRef(null);
  const menuRefs = useRef([]);
  menuRefs.current = [];

  const addToRefs = (el) => {
    if (el && !menuRefs.current.includes(el)) {
      menuRefs.current.push(el);
    }
  };

  const navigate = useNavigate();

  const autoProg = useCallback(() => {
    if (!isPaused) {
      setProgress(0);
      setAboutIndex((aboutIndex + 1) % studioData.length);
    }
  }, [isPaused, aboutIndex, studioData.length]);

  const handleLinkClick = (event, path) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setShowSplash(true);
    setContactFloat(false);

    setTimeout(() => {
      setOpenDropdown(null);
      setMenu(false);
      document.body.classList.remove('menu-open');
    }, 2);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  const handleDarkModeClick = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setDarkMode(!darkMode);
  };

  const handleMuteClick = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setMute(!mute);
  };

  const toggleDropdown = (event, dropdown) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  useEffect(() => {
    if (artistData) {
      const sortedData = [...artistData].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setSortedArtists(sortedData);
    }
  }, [artistData]);

  useEffect(() => {
    if (newsData) {
      const sortedData = [...newsData].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setSortedNews(sortedData);
    }
  }, [newsData]);

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

  useEffect(() => {
    if (menu) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setMenu(false);
        setOpenDropdown(null);
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820 && menu) {
        setMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menu]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY !== 0) {
        const scrollContainer =
          openDropdown === 'news'
            ? newsScrollRef.current
            : artistsScrollRef.current;
        if (scrollContainer) {
          scrollContainer.scrollLeft += event.deltaY * 5;
          event.preventDefault();
        }
      }
    };

    if (openDropdown === 'news' || openDropdown === 'artists') {
      window.addEventListener('wheel', handleScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [openDropdown]);

  const handlePrev = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAboutIndex(
      (aboutIndex - 1 + studioData.length + 2) % (studioData.length + 2)
    );
  };

  const handleNext = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    setAboutIndex((aboutIndex + 1) % (studioData.length + 2));
  };

  const handlePause = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setIsPaused(!isPaused);
  };

  const getImgImg = (item) => {
    if (item.img && Array.isArray(item.img)) {
      return item.img[0]?.img || item.img || noUserImg;
    }
    return item.img || noUserImg;
  };

  const handleTransitionEnd = () => {
    const wrapper = document.querySelector('.menu-slide-pics-wrapper');
    const titleWrapper = document.querySelector('.menu-slide-titles-wrapper');
    if (aboutIndex === studioData.length + 1) {
      setAboutIndex(1);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-100%)`;
      titleWrapper.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    } else if (aboutIndex === 0) {
      setAboutIndex(studioData.length);
      wrapper.style.transition = 'none';
      titleWrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-${100 * studioData.length}%)`;
      titleWrapper.style.transform = `translateX(-${100 * studioData.length}%)`;
      setTimeout(() => {
        wrapper.style.transition = '';
        titleWrapper.style.transition = '';
      }, 50);
    }
  };

  return (
    <>
      <main className={`menu-container ${menu ? 'menu-open' : ''}`}>
        <section className='menu-menu' id='menu-menu'>
          <div className='menu-header' ref={addToRefs}>
            <h2 className='menu-header-text'>MENU</h2>
          </div>
          <div className='menu-links' ref={addToRefs}>
            <div
              className='menu-item'
              onMouseDown={(event) => {
                handleLinkClick(event, '/news');
              }}
            >
              <div className='menu-item-icon' ref={addToRefs}>
                <Icon name='news' alt='news icon' svgClass='menu-page-icon' />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                <p className='menu-link-text' id='menu-link-text'>
                  News
                </p>
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'news');
                }}
                ref={addToRefs}
              >
                {openDropdown === 'news' ? (
                  <Icon
                    name='drop-up'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                ) : (
                  <Icon
                    name='drop-down'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                )}
              </div>
            </div>
            {openDropdown === 'news' && (
              <div className='menu-item-content'>
                <div
                  className='menu-content-scroll-container'
                  ref={newsScrollRef}
                >
                  {sortedNews && sortedNews.length > 0 ? (
                    sortedNews.map((article) => (
                      <div
                        key={article.id}
                        className='menu-content-link'
                        onMouseDown={(event) => {
                          handleLinkClick(
                            event,
                            `/news/${formatTitleForURL(article.title)}`
                          );
                        }}
                      >
                        <img
                          src={article.img}
                          alt={article.title}
                          className='menu-news-image'
                        />
                        <div className='menu-news-title'>{article.title}</div>
                        <div className='menu-news-subtitle'>{article.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className='loading-skeletons'>
                      {Array(5)
                        .fill()
                        .map((_, index) => (
                          <div key={index} className='skeleton-container'>
                            <div className='skeleton-image'>
                              <Skeleton height={150} width={150} />
                              <CircularProgress
                                size={30}
                                sx={{
                                  color: 'var(--clr-divider)',
                                  position: 'absolute',
                                  top: '45%',
                                  left: '40%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              />
                            </div>
                            <Skeleton
                              width={150}
                              height={20}
                              style={{ marginTop: 8 }}
                            />
                            <Skeleton width={150} height={14} />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onMouseDown={(event) => {
                handleLinkClick(event, '/artists');
              }}
            >
              <div className='menu-item-icon' ref={addToRefs}>
                <Icon
                  name='artists'
                  alt='artists icon'
                  svgClass='menu-page-icon'
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                <p className='menu-link-text' id='menu-link-text'>
                  Artists
                </p>
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'artists');
                }}
                ref={addToRefs}
              >
                {openDropdown === 'artists' ? (
                  <Icon
                    name='drop-up'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                ) : (
                  <Icon
                    name='drop-down'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                )}
              </div>
            </div>
            {openDropdown === 'artists' && (
              <div className='menu-item-content'>
                <div
                  className='menu-content-scroll-container'
                  ref={artistsScrollRef}
                >
                  {sortedArtists && sortedArtists.length > 0 ? (
                    sortedArtists.map((artist) => (
                      <div
                        key={artist.name}
                        className='menu-content-link'
                        onMouseDown={(event) => {
                          handleLinkClick(
                            event,
                            `/artists/${formatTitleForURL(artist.name)}`
                          );
                        }}
                      >
                        <img
                          src={getImgImg(artist)}
                          alt={artist.name}
                          className='menu-news-image'
                        />
                        <div className='menu-artists-title'>{artist.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className='loading-skeletons'>
                      {Array(5)
                        .fill()
                        .map((_, index) => (
                          <div key={index} className='skeleton-container'>
                            <div className='skeleton-image'>
                              <Skeleton height={150} width={150} />
                              <CircularProgress
                                size={30}
                                sx={{
                                  color: 'var(--clr-divider)',
                                  position: 'absolute',
                                  top: '45%',
                                  left: '40%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              />
                            </div>
                            <Skeleton
                              width={150}
                              height={20}
                              style={{ marginTop: 8 }}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onMouseDown={(event) => {
                handleLinkClick(event, '/about');
              }}
            >
              <div className='menu-item-icon' ref={addToRefs}>
                <Icon name='about' alt='about icon' svgClass='menu-page-icon' />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                <p className='menu-link-text' id='menu-link-text'>
                  About
                </p>
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'about');
                }}
                ref={addToRefs}
              >
                {openDropdown === 'about' ? (
                  <Icon
                    name='drop-up'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                ) : (
                  <Icon
                    name='drop-down'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                )}
              </div>
            </div>
            {openDropdown === 'about' && (
              <div className='menu-item-content'>
                <div className='menu-about-content' id='menu-about-content'>
                  {studioData && studioData.length > 0 ? (
                    <>
                      <div
                        className='menu-content-slide-container'
                        id='menu-content-slide-container'
                      >
                        <div
                          className='menu-slide-pics-wrapper'
                          style={{
                            transform: `translateX(-${aboutIndex * 100}%)`,
                          }}
                          onTransitionEnd={handleTransitionEnd}
                        >
                          <div
                            className='menu-slide-pic-wrapper'
                            onMouseDown={(event) => handlePause(event)}
                          >
                            <img
                              src={studioData[studioData.length - 1].img}
                              alt={studioData[studioData.length - 1].title}
                              className='menu-slide-pic'
                            />
                          </div>
                          {studioData.map((img, index) => (
                            <div
                              key={index}
                              className='menu-slide-pic-wrapper'
                              onMouseDown={(event) => handlePause(event)}
                            >
                              <img
                                src={img.img}
                                alt={img.title}
                                className='menu-slide-pic'
                              />
                            </div>
                          ))}
                          <div
                            className='menu-slide-pic-wrapper'
                            onMouseDown={(event) => handlePause(event)}
                          >
                            <img
                              src={studioData[0].img}
                              alt={studioData[0].title}
                              className='menu-slide-pic'
                            />
                          </div>
                        </div>
                        <div className='progress-bar'>
                          <div
                            className='progress-bar-fill'
                            style={{
                              width: `${progress}%`,
                              transition:
                                progress === 0 ? 'none' : 'width 0.1s linear',
                            }}
                          ></div>
                        </div>
                        <div className='toggle-pics-container-left'>
                          <div
                            className='pic-slider-btn-left'
                            onMouseDown={(event) => {
                              handlePrev(event);
                            }}
                          >
                            <ArrowBigLeft />
                          </div>
                        </div>
                        <div className='toggle-pics-container-right'>
                          <div
                            className='pic-slider-btn-right'
                            onMouseDown={(event) => {
                              handleNext(event);
                            }}
                          >
                            <ArrowBigRight />
                          </div>
                        </div>
                      </div>
                      <div
                        className='menu-content-text-container'
                        id='menu-content-text-container'
                      >
                        <div className='menu-content-title-container'>
                          <div
                            className='menu-slide-titles-wrapper'
                            style={{
                              transform: `translateX(-${aboutIndex * 100}%)`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                          >
                            <div className='menu-slide-title-wrapper'>
                              <p className='menu-slide-pics-title'>
                                {studioData[studioData.length - 1].title}
                              </p>
                            </div>
                            {studioData.map((title, index) => (
                              <div
                                key={index}
                                className='menu-slide-title-wrapper'
                              >
                                <p className='menu-slide-pics-title'>
                                  {title.title}
                                </p>
                              </div>
                            ))}
                            <div className='menu-slide-title-wrapper'>
                              <p className='menu-slide-pics-title'>
                                {studioData[0].title}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className='menu-content-text'>
                          Fostering creativity and collaboration while striving
                          for ethical, equitable, and sustainable practices. We
                          nurture artistry and self-expression, uniting people
                          through the universal language of music.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className='loading-skeletons'>
                      <div className='skeleton-container-about'>
                        <div className='skeleton-image-about'>
                          <Skeleton height={180} />
                          <CircularProgress
                            size={40}
                            sx={{
                              color: 'var(--clr-divider)',
                              position: 'absolute',
                              top: '40%',
                              left: '42%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        </div>
                        <div className='skeleton-text-about'>
                          <Skeleton
                            count={6}
                            width={300}
                            height={15}
                            style={{ marginBottom: 2 }}
                            className='menu-about-skeletons'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onMouseDown={(event) => {
                handleLinkClick(event, '/contact');
              }}
            >
              <div className='menu-item-icon' ref={addToRefs}>
                <Icon
                  name='contact'
                  alt='contact icon'
                  svgClass='menu-page-icon'
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                <p className='menu-link-text' id='menu-link-text'>
                  Contact
                </p>
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  toggleDropdown(event, 'contact');
                }}
                ref={addToRefs}
              >
                {openDropdown === 'contact' ? (
                  <Icon
                    name='drop-up'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                ) : (
                  <Icon
                    name='drop-down'
                    alt='dropdown icon'
                    svgClass='dropdown-icon'
                  />
                )}
              </div>
            </div>
            {openDropdown === 'contact' && (
              <div className='menu-item-content'>
                <div className='menu-contact-content'>
                  <h2>Send us a message:</h2>
                  <form className='menu-form' onSubmit={handleSubmit}>
                    <input
                      type='text'
                      placeholder='Your name'
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type='email'
                      placeholder='Your email'
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      placeholder='Your message'
                      name='message'
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                    <button type='submit'>Send</button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className='menu-toggles' id='menu-toggles' ref={addToRefs}>
            <div ref={addToRefs}>
              {darkMode ? (
                <Icon
                  name='darkmode'
                  alt='darkmode icon'
                  svgClass='menu-dark-toggle'
                  onMouseDown={handleDarkModeClick}
                />
              ) : (
                <Icon
                  name='lightmode'
                  alt='darkmode icon'
                  svgClass='menu-dark-toggle'
                  onMouseDown={handleDarkModeClick}
                />
              )}
            </div>
            <div ref={addToRefs}>
              {mute ? (
                <Icon
                  name='mute'
                  alt='mute/unmute icon'
                  svgClass='menu-mute-toggle'
                  onMouseDown={handleMuteClick}
                />
              ) : (
                <Icon
                  name='unmute'
                  alt='mute/unmute icon'
                  svgClass='menu-mute-toggle'
                  onMouseDown={handleMuteClick}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;
