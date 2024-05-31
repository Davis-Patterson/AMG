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
    { title: 'Lexicon 480L', img: 'https://i.imgur.com/b3os6DI.jpeg' },
    { title: 'API 1608 Control Room', img: 'https://i.imgur.com/42QeuF0.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/5UNtUH3.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/EUCcYJh.jpeg' },
    { title: 'Live Room', img: 'https://i.imgur.com/0tRM8gn.jpeg' },
    { title: 'Live Room', img: 'https://i.imgur.com/OmjVrom.jpeg' },
    { title: 'Production Suite', img: 'https://i.imgur.com/pLs2TXb.jpeg' },
    { title: 'Production Suite', img: 'https://i.imgur.com/VfnFTgL.jpeg' },
    { title: 'Neumann U 47', img: 'https://i.imgur.com/LWQPjtn.jpeg' },
    { title: 'S6L & Pro Tools', img: 'https://i.imgur.com/rKnZ633.jpeg' },
    { title: 'S6L', img: 'https://i.imgur.com/ql38mWm.jpeg' },
    { title: 'SSL 4000G+', img: 'https://i.imgur.com/lRUTAS2.jpeg' },
    { title: 'SSL 4000G+', img: 'https://i.imgur.com/C4RFROH.jpeg' },
    { title: 'SSL 4000G+ closeup', img: 'https://i.imgur.com/bZl9LRa.jpeg' },
    { title: 'SSL 4000G+ patchbay', img: 'https://i.imgur.com/PWDW6dP.jpeg' },
    { title: 'SSL 4000G+ faders', img: 'https://i.imgur.com/ecYZOGQ.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/ZrcbpDn.jpeg' },
    { title: 'Control Room', img: 'https://i.imgur.com/AzVQbPA.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/IhLt3Yk.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/j20vH81.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/I2GrgOy.jpeg' },
    {
      title: 'Digidesign Control Room',
      img: 'https://i.imgur.com/tkpTHxb.jpeg',
    },
    { title: 'Audient ASP8024', img: 'https://i.imgur.com/y3xkJmG.jpeg' },
    { title: 'OP-6 Amp', img: 'https://i.imgur.com/1noSx2f.jpg' },
    { title: 'Studer A827', img: 'https://i.imgur.com/QZb5qkH.jpeg' },
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
