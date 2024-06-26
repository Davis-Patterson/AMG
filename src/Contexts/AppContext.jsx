import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchNews,
  fetchHome,
  fetchStudio,
  fetchArtists,
  fetchContact,
  fetchLoc,
  fetchAmgBanner,
} from 'utils/Api';
import useLocalStorageState from 'use-local-storage-state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showArtwork, setShowArtwork] = useState(false);
  const [artworkData, setArtworkData] = useState({
    src: '',
    alt: '',
    title: '',
    artist: '',
    album: '',
    date: '',
    explicit: '',
  });

  const [menu, setMenu] = useState(false);

  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', false);
  const [mute, setMute] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [contactFloat, setContactFloat] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const [homeIndex, setHomeIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [artistsIndex, setArtistsIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);
  const [contactIndex, setContactIndex] = useState(0);

  const [homeData, setHomeData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [locData, setLocData] = useState([]);
  const [amgBanner, setAmgBanner] = useState([]);

  const [form, setForm] = useState({
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const noUserImg =
    'https://amgbucket.s3.us-east-2.amazonaws.com/extra/no-user.webp';
  const noAlbumImg =
    'https://amgbucket.s3.us-east-2.amazonaws.com/audio/no-album.webp';

  const navigate = useNavigate();

  const handleLinkClick = (event, path) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setIsPaused(false);
    setShowSplash(true);
    setContactFloat(false);

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const formatTitleForURL = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const artworkOpen = (
    event,
    src,
    alt,
    title = '',
    artist = '',
    album = '',
    date = '',
    explicit = ''
  ) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setWasPaused(isPaused);
    setIsPaused(true);
    setArtworkData({ src, alt, title, artist, album, date, explicit });
    setShowArtwork(true);
  };

  const artworkClose = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setShowArtwork(false);
    setIsPaused(wasPaused);
    setArtworkData({
      src: '',
      alt: '',
      title: '',
      artist: '',
      album: '',
      date: '',
      explicit: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

  useEffect(() => {
    const getHomeData = async () => {
      const homeDataData = await fetchHome();
      setHomeData(homeDataData);
    };
    const getNews = async () => {
      const newsDataData = await fetchNews();
      setNewsData(newsDataData);
    };
    const getArtistData = async () => {
      const artistDataData = await fetchArtists();
      setArtistData(artistDataData);
    };
    const getStudioData = async () => {
      const studioDataData = await fetchStudio();
      setStudioData(studioDataData);
    };
    const getContactData = async () => {
      const contactDataData = await fetchContact();
      setContactData(contactDataData);
    };
    const getLocData = async () => {
      const locDataData = await fetchLoc();
      setLocData(locDataData);
    };
    const getAmgBanner = async () => {
      const amgBannerData = await fetchAmgBanner();
      setAmgBanner(amgBannerData);
    };

    getHomeData();
    getContactData();
    getLocData();
    getAmgBanner();

    getNews();
    getArtistData();
    getStudioData();

    // setTimeout(() => {
    //   getNews();
    //   getArtistData();
    //   getStudioData();
    // }, 4000);
  }, []);

  return (
    <AppContext.Provider
      value={{
        showSplash,
        setShowSplash,
        showArtwork,
        artworkData,
        setArtworkData,
        darkMode,
        setDarkMode,
        mute,
        setMute,
        menu,
        setMenu,
        openDropdown,
        setOpenDropdown,
        contactFloat,
        setContactFloat,
        isPaused,
        setIsPaused,
        setWasPaused,
        homeIndex,
        setHomeIndex,
        newsIndex,
        setNewsIndex,
        artistsIndex,
        setArtistsIndex,
        aboutIndex,
        setAboutIndex,
        contactIndex,
        setContactIndex,
        homeData,
        newsData,
        artistData,
        studioData,
        contactData,
        locData,
        amgBanner,
        noUserImg,
        noAlbumImg,
        form,
        setForm,
        sending,
        setSending,
        success,
        setSuccess,
        error,
        setError,
        handleLinkClick,
        formatTitleForURL,
        handleChange,
        artworkOpen,
        artworkClose,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
