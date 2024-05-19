import React, { createContext, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', false);
  const [mute, setMute] = useState(true);

  return (
    <AppContext.Provider
      value={{
        showSplash,
        setShowSplash,
        contentVisible,
        setContentVisible,
        darkMode,
        setDarkMode,
        mute,
        setMute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
