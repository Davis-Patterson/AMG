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
    newsData,
    artistData,
    studioData,
    formatTitleForURL,
  } = useContext(AppContext);

  const [aboutIndex, setAboutIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [form, setForm] = useState({
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // put client here
    // .then(
    (result) => {
      setSending(false);
      setSuccess(true);
      console.log('Email successfully sent!', result.text);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      setForm({
        user_name: '',
        email: '',
        message: '',
      });
    },
      (error) => {
        setSending(false);
        setError(true);
        console.log('Failed to send email:', error.text);
        setTimeout(() => {
          setError(false);
        }, 3000);
      };
    // );
  };

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

  const handleLinkClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      setOpenDropdown(null);
      setMenu(false);
      document.body.classList.remove('menu-open');
    }, 2);

    setTimeout(() => {
      navigate(path);
    }, 5);
  };

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const handleMuteClick = () => {
    setMute(!mute);
  };

  const handleMenu = () => {
    setOpenDropdown(null);
    setMenu(false);
    document.body.classList.remove('menu-open');
  };

  const toggleDropdown = (event, dropdown) => {
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

  const handlePrev = () => {
    setProgress(0);
    setAboutIndex(
      (aboutIndex - 1 + studioData.length + 2) % (studioData.length + 2)
    );
  };

  const handleNext = () => {
    setProgress(0);
    setAboutIndex((aboutIndex + 1) % (studioData.length + 2));
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
            <div className='menu-item' onClick={() => handleLinkClick('/news')}>
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
                onClick={(event) => toggleDropdown(event, 'news')}
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
                  {newsData.map((article) => (
                    <div
                      key={article.id}
                      className='menu-content-link'
                      onClick={() =>
                        handleLinkClick(
                          `/news/${formatTitleForURL(article.title)}`
                        )
                      }
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className='menu-news-image'
                      />
                      <div className='menu-news-title'>{article.title}</div>
                      <div className='menu-news-subtitle'>{article.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onClick={() => handleLinkClick('/artists')}
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
                onClick={(event) => toggleDropdown(event, 'artists')}
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
                  {artistData.map((artist) => (
                    <div
                      key={artist.name}
                      className='menu-content-link'
                      onClick={() =>
                        handleLinkClick(
                          `/artists/${formatTitleForURL(artist.name)}`
                        )
                      }
                    >
                      <img
                        src={artist.img}
                        alt={artist.name}
                        className='menu-news-image'
                      />
                      <div className='menu-artists-title'>{artist.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onClick={() => handleLinkClick('/about')}
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
                onClick={(event) => toggleDropdown(event, 'about')}
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
                      <div className='pic-slider-btn-left' onClick={handlePrev}>
                        <ArrowBigLeft />
                      </div>
                    </div>
                    <div className='toggle-pics-container-right'>
                      <div
                        className='pic-slider-btn-right'
                        onClick={handleNext}
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
                          <div key={index} className='menu-slide-title-wrapper'>
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
                      Fostering creativity and collaboration while striving for
                      ethical, equitable, and sustainable practices. We nurture
                      artistry and self-expression, uniting people through the
                      universal language of music.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div
              className='menu-item'
              onClick={() => handleLinkClick('/contact')}
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
                onClick={(event) => toggleDropdown(event, 'contact')}
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
              onClick={handleDarkModeClick}
              ref={addToRefs}
            />
            <img
              src={currentSoundIcon}
              alt='mute/unmute icon'
              className='menu-mute-toggle'
              onClick={handleMuteClick}
              ref={addToRefs}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;
