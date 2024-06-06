import React, { useEffect, useContext, lazy } from 'react';
import { AppContext } from 'contexts/AppContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Home from 'components/Home';
import Footer from 'components/Footer';
import Splash from 'utils/Splash';
import Menu from 'components/Menu';
import ContactFloat from 'utils/ContactFloat';
import 'styles/App.css';

const News = lazy(() => import('components/News'));
const Artists = lazy(() => import('components/Artists'));
const About = lazy(() => import('components/About'));
const Contact = lazy(() => import('components/Contact'));
const Article = lazy(() => import('utils/Article'));
const Artist = lazy(() => import('utils/Artist'));

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
