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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
