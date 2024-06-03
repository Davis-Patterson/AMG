import React, { createContext, useState, useEffect } from 'react';
import {
  fetchNews,
  fetchHome,
  fetchStudio,
  fetchArtists,
  fetchLoc,
} from 'utils/Api';
import useLocalStorageState from 'use-local-storage-state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', true);
  const [mute, setMute] = useState(true);
  const [menu, setMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [contactFloat, setContactFloat] = useState(false);

  const [homeIndex, setHomeIndex] = useState(0);
  const [aboutPicIndex, setAboutPicIndex] = useState(0);
  const [artistsPicIndex, setArtistsPicIndex] = useState(0);

  const [newsData, setNewsData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [locData, setLocData] = useState([]);

  const noUserImg = 'https://i.imgur.com/B4UC9KD.png';

  const formatTitleForURL = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');
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
    const getLocData = async () => {
      const locDataData = await fetchLoc();
      setLocData(locDataData);
    };

    getHomeData();
    getNews();
    getArtistData();
    getStudioData();
    getLocData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showSplash,
        setShowSplash,
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
        homeIndex,
        setHomeIndex,
        aboutPicIndex,
        setAboutPicIndex,
        artistsPicIndex,
        setArtistsPicIndex,
        homeData,
        newsData,
        artistData,
        studioData,
        locData,
        noUserImg,
        formatTitleForURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
