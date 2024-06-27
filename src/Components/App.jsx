import React, {
  useState,
  useEffect,
  useContext,
  lazy,
  startTransition,
  Suspense,
} from 'react';
import { AppContext } from 'contexts/AppContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import Splash from 'utils/Splash';
import Nav from 'components/Nav';
import Home from 'components/Home';
import Footer from 'components/Footer';
import Menu from 'components/Menu';
import ContactFloat from 'utils/ContactFloat';
import Artwork from 'utils/Artwork';
import 'styles/App.css';

const News = lazy(() => import('components/News'));
const Artists = lazy(() => import('components/Artists'));
const About = lazy(() => import('components/About'));
const Contact = lazy(() => import('components/Contact'));
const Article = lazy(() => import('components/Article'));
const Artist = lazy(() => import('components/Artist'));

function App() {
  const { setShowSplash, showArtwork } = useContext(AppContext);
  const location = useLocation();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setPending(true);
      setShowSplash(true);

      const splashTimeout = setTimeout(() => {
        setShowSplash(false);
        setPending(false);
      }, 1000);

      return () => {
        clearTimeout(splashTimeout);
      };
    });
  }, [location, setShowSplash]);

  return (
    <>
      <Splash />
      {showArtwork && <Artwork />}
      <Menu />
      <>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/news'
            element={
              <Suspense fallback={<Splash />}>
                <News />
              </Suspense>
            }
          />
          <Route
            path='/news/:title'
            element={
              <Suspense fallback={<Splash />}>
                <Article />
              </Suspense>
            }
          />
          <Route
            path='/artists'
            element={
              <Suspense fallback={<Splash />}>
                <Artists />
              </Suspense>
            }
          />
          <Route
            path='/artists/:name'
            element={
              <Suspense fallback={<Splash />}>
                <Artist />
              </Suspense>
            }
          />
          <Route
            path='/about'
            element={
              <Suspense fallback={<Splash />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path='/contact'
            element={
              <Suspense fallback={<Splash />}>
                <Contact />
              </Suspense>
            }
          />
        </Routes>
        <ContactFloat />
        <Footer />
      </>
    </>
  );
}

export default App;
