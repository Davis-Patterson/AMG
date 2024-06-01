import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import 'styles/Artist.css';

const defaultImage = 'https://i.imgur.com/B4UC9KD.png';

function Artist() {
  const { name } = useParams();
  const { artistData, formatTitleForURL } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const artist = artistData.find(
    (artist) => formatTitleForURL(artist.name) === name
  );

  const headerImage = artist.banner || artist.img || defaultImage;

  if (!artist) {
    return (
      <main className='page-container' id='page-container'>
        <header className='news-header' id='about-header'>
          <div className='news-header-gradient-overlay' />
          <div className='news-header-gradient-overlay' />
          <section className='news-header-text-container'>
            <div className='news-title-container'>
              <h1 className='news-title'>Not Found</h1>
              <p className='news-tagline'>
                Unfortunately, we cannot find the artist that you're looking
                for.
              </p>
            </div>
          </section>
          <section className='news-header-pics-container'>
            <img
              src={onAirImg}
              alt='current studio pic'
              className='news-header-pics'
            />
          </section>
        </header>
      </main>
    );
  }

  return (
    <main className='page-container' id='page-container'>
      <header className='artist-header' id='artist-header'>
        <div className='artist-header-gradient-overlay' />
        <section className='artist-header-pics-container'>
          <img
            src={headerImage}
            alt={artist.name}
            className='artist-header-pics'
          />
        </section>
      </header>
      <div className='artist-detail-container'>
        <div className='artist-header-content'>
          <img
            src={artist.img || defaultImage}
            alt={artist.name}
            className='news-artist-image'
          />
          <div className='artist-title-container'>
            <h2 className='artist-title'>{artist.name}</h2>
            {/* <p className='artist-info'>By {artist.name}</p>
            <p className='artist-info'>{artist.name}</p> */}
          </div>
        </div>
        <div className='artist-text-content'>
          <p className='artist-bio'>{artist.bio}</p>
        </div>
      </div>
      <div className='gap' />
    </main>
  );
}

export default Artist;
