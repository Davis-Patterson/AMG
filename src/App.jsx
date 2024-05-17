import React, { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Home from 'components/Home';
import Footer from 'components/Footer';

function App() {
  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', false);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setActiveSection(path || 'home');
  }, [location]);

  return (
    <>
      <Nav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              darkMode={darkMode}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
      </Routes>
      <Footer darkMode={darkMode} activeSection={activeSection} />
    </>
  );
}

export default App;
