import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Home from 'components/Home';
import Footer from 'components/Footer';
import Splash from 'components/Splash';
import News from 'components/News';
import Artists from 'components/Artists';
import About from 'components/About';
import Contact from 'components/Contact';
import 'styles/App.css';

function App() {
  const { setShowSplash, contentVisible } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setShowSplash(true);

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, [location, setShowSplash]);

  return (
    <>
      <Splash />
      <>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' element={<News />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </>
    </>
  );
}

export default App;
