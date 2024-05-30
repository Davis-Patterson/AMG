import React, { createContext, useState, useEffect } from 'react';
import { fetchNews } from 'utils/Api';
import useLocalStorageState from 'use-local-storage-state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', true);
  const [mute, setMute] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [news, setNews] = useState([]);

  const [aboutPicIndex, setAboutPicIndex] = useState(0);
  const [artistsPicIndex, setArtistsPicIndex] = useState(0);

  const studioData = [
    { name: 'O2R', img: 'https://i.imgur.com/IhLt3Yk.jpeg' },
    { name: 'Lexicon', img: 'https://i.imgur.com/b3os6DI.jpeg' },
    { name: 'Outboard 1', img: 'https://i.imgur.com/ZrcbpDn.jpeg' },
    { name: 'Outboard 2', img: 'https://i.imgur.com/5UNtUH3.jpeg' },
    { name: 'Outboard 3', img: 'https://i.imgur.com/EUCcYJh.jpeg' },
    { name: 'Production Suite 1', img: 'https://i.imgur.com/pLs2TXb.jpeg' },
    { name: 'Production Suite 2', img: 'https://i.imgur.com/VfnFTgL.jpeg' },
    { name: 'S6 Pro Tools', img: 'https://i.imgur.com/rKnZ633.jpeg' },
    { name: 'SSL 1', img: 'https://i.imgur.com/lRUTAS2.jpeg' },
    { name: 'SSL 2', img: 'https://i.imgur.com/C4RFROH.jpeg' },
    { name: 'SSL closeup', img: 'https://i.imgur.com/bZl9LRa.jpeg' },
    { name: 'SSL patchbay', img: 'https://i.imgur.com/PWDW6dP.jpeg' },
    { name: 'Suite 1', img: 'https://i.imgur.com/0tRM8gn.jpeg' },
    { name: 'Suite 2', img: 'https://i.imgur.com/OmjVrom.jpeg' },
    { name: 'Amp', img: 'https://i.imgur.com/1noSx2f.jpg' },
  ];

  const artistsData = [
    {
      name: 'DJ Moonlight',
      img: 'https://i.imgur.com/FnyV0lA.jpeg',
      bio: 'This is a test bio that will be filled in later.',
    },
    {
      name: 'Lily Sterling',
      img: 'https://i.imgur.com/g0UZimv.jpeg',
      bio: 'This is a test bio that will be filled in later.',
    },
    {
      name: 'Aerotype Productions',
      img: 'https://i.imgur.com/uJHbdvZ.png',
      bio: 'This is a test bio that will be filled in later.',
    },
  ];

  const formatTitleForURL = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
    };

    getNews();
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
        dropdown,
        setDropdown,
        news,
        aboutPicIndex,
        setAboutPicIndex,
        artistsPicIndex,
        setArtistsPicIndex,
        studioData,
        artistsData,
        formatTitleForURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
