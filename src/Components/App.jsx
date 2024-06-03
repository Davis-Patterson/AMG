import React, { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Home from 'components/Home';
import Footer from 'components/Footer';
import Splash from 'utils/Splash';
import Menu from 'utils/Menu';
import ContactFloat from 'utils/ContactFloat';
import News from 'components/News';
import Artists from 'components/Artists';
import About from 'components/About';
import Contact from 'components/Contact';
import Article from 'components/Utils/Article';
import Artist from 'components/Utils/Artist';
import 'styles/App.css';

function App() {
  const { setShowSplash } = useContext(AppContext);

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
      <Menu />
      <>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:title' element={<Article />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artists/:name' element={<Artist />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <ContactFloat />
        <Footer />
      </>
    </>
  );
}

export default App;
