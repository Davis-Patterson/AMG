import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Artist.css';

function Artist() {
  const { name } = useParams();
  const { artistData, noUserImg, formatTitleForURL } = useContext(AppContext);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (artistData.length > 0) {
      const foundArtist = artistData.find(
        (artist) => formatTitleForURL(artist.name) === name
      );
      setArtist(foundArtist);
    }
  }, [artistData, name, formatTitleForURL]);

  if (!artistData || artistData.length === 0) {
    return (
      <main className='page-container' id='page-container'>
        <header className='artists-header' id='artists-header'>
          <section className='artists-header-pics-container'>
            <Skeleton className='header-skeleton' />
            <div className='circular-progress-container'>
              <CircularProgress
                size={40}
                sx={{
                  color: 'var(--clr-divider)',
                }}
              />
            </div>
          </section>
        </header>
        <section className='loading-content-container'>
          <div className='loading-content'>
            <div className='skeleton-article-cards'>
              <div className='skeleton-article-card'>
                <div className='skeleton-article-image'>
                  <Skeleton height={150} width={150} />
                  <div className='circular-progress-container'>
                    <CircularProgress
                      size={40}
                      sx={{
                        color: 'var(--clr-divider)',
                      }}
                    />
                  </div>
                </div>
                <div className='skeleton-article-content'>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div className='skeleton-shadow-container'>
                    <Skeleton
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='gap' />
      </main>
    );
  }

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

  const headerImage = artist.banner || artist.img || noUserImg;

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
            src={artist.img || noUserImg}
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
