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
import darkmodeIcon from 'assets/Utils/darkmode-white.svg';
import lightmodeIcon from 'assets/Utils/lightmode-black.svg';
import darkMuteIcon from 'assets/Utils/mute-black.svg';
import lightMuteIcon from 'assets/Utils/mute-white.svg';
import darkUnmuteIcon from 'assets/Utils/unmute-black.svg';
import lightUnmuteIcon from 'assets/Utils/unmute-white.svg';
import dropUpBlack from 'assets/Utils/drop-up-black.svg';
import dropUpWhite from 'assets/Utils/drop-up-white.svg';
import dropDownBlack from 'assets/Utils/drop-down-black.svg';
import dropDownWhite from 'assets/Utils/drop-down-white.svg';
import newsBlack from 'assets/Utils/news-black.svg';
import newsWhite from 'assets/Utils/news-white.svg';
import artistsBlack from 'assets/Utils/artists-black.svg';
import artistsWhite from 'assets/Utils/artists-white.svg';
import aboutBlack from 'assets/Utils/about-black.svg';
import aboutWhite from 'assets/Utils/about-white.svg';
import contactBlack from 'assets/Utils/contact-black.svg';
import contactWhite from 'assets/Utils/contact-white.svg';
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

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const menuRefs = useRef([]);
  menuRefs.current = [];

  const addToRefs = (el) => {
    if (el && !menuRefs.current.includes(el)) {
      menuRefs.current.push(el);
    }
  };

  const currentUp = darkMode ? dropUpWhite : dropUpBlack;
  const currentDown = darkMode ? dropDownWhite : dropDownBlack;
  const currentNews = darkMode ? newsWhite : newsBlack;
  const currentArtists = darkMode ? artistsWhite : artistsBlack;
  const currentAbout = darkMode ? aboutWhite : aboutBlack;
  const currentContact = darkMode ? contactWhite : contactBlack;
  const currentDarkmodeIcon = darkMode ? darkmodeIcon : lightmodeIcon;
  const currentMuteIcon = darkMode ? lightMuteIcon : darkMuteIcon;
  const currentUnmuteIcon = darkMode ? lightUnmuteIcon : darkUnmuteIcon;
  const currentSoundIcon = mute ? currentMuteIcon : currentUnmuteIcon;

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
              <div className='menu-item-icon'>
                <img
                  src={currentNews}
                  alt='news icon'
                  className='menu-page-icon'
                  ref={addToRefs}
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                News
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'news');
                }}
                ref={addToRefs}
              >
                <img
                  src={openDropdown === 'news' ? currentUp : currentDown}
                  alt='dropdown icon'
                  className='dropdown-icon'
                  ref={addToRefs}
                />
              </div>
            </div>
            {openDropdown === 'news' && (
              <div className='menu-item-content'>
                <div className='menu-content-scroll-container'>
                  {newsData && newsData.length > 0 ? (
                    newsData.map((article) => (
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
              <div className='menu-item-icon'>
                <img
                  src={currentArtists}
                  alt='artists icon'
                  className='menu-page-icon'
                  ref={addToRefs}
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                Artists
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'artists');
                }}
                ref={addToRefs}
              >
                <img
                  src={openDropdown === 'artists' ? currentUp : currentDown}
                  alt='dropdown icon'
                  className='dropdown-icon'
                  ref={addToRefs}
                />
              </div>
            </div>
            {openDropdown === 'artists' && (
              <div className='menu-item-content'>
                <div className='menu-content-scroll-container'>
                  {artistData && artistData.length > 0 ? (
                    artistData.map((artist) => (
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
              <div className='menu-item-icon'>
                <img
                  src={currentAbout}
                  alt='about icon'
                  className='menu-page-icon'
                  ref={addToRefs}
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                About
              </div>
              <div
                className='menu-item-dropdown-icon'
                onMouseDown={(event) => {
                  toggleDropdown(event, 'about');
                }}
                ref={addToRefs}
              >
                <img
                  src={openDropdown === 'about' ? currentUp : currentDown}
                  alt='dropdown icon'
                  className='dropdown-icon'
                  ref={addToRefs}
                />
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
                          <div className='menu-slide-pic-wrapper'>
                            <img
                              src={studioData[studioData.length - 1].img}
                              alt={studioData[studioData.length - 1].title}
                              className='menu-slide-pic'
                            />
                          </div>
                          {studioData.map((img, index) => (
                            <div key={index} className='menu-slide-pic-wrapper'>
                              <img
                                src={img.img}
                                alt={img.title}
                                className='menu-slide-pic'
                              />
                            </div>
                          ))}
                          <div className='menu-slide-pic-wrapper'>
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
              <div className='menu-item-icon'>
                <img
                  src={currentContact}
                  alt='contact icon'
                  className='menu-page-icon'
                  ref={addToRefs}
                />
              </div>
              <div className='menu-link' id='menu-link' ref={addToRefs}>
                Contact
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
                <img
                  src={openDropdown === 'contact' ? currentUp : currentDown}
                  alt='dropdown icon'
                  className='dropdown-icon'
                  ref={addToRefs}
                />
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
            <img
              src={currentDarkmodeIcon}
              alt='darkmode icon'
              className='menu-dark-toggle'
              onMouseDown={(event) => handleDarkModeClick(event)}
              ref={addToRefs}
            />
            <img
              src={currentSoundIcon}
              alt='mute/unmute icon'
              className='menu-mute-toggle'
              onMouseDown={(event) => handleMuteClick(event)}
              ref={addToRefs}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;
