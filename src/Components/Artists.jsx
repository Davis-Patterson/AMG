import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import Banner from 'utils/Banner';
import Slideshow from 'utils/Slideshow';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Artists.css';

function Artists() {
  const {
    darkMode,
    artistData,
    setShowSplash,
    artistsPicIndex,
    setArtistsPicIndex,
    noUserImg,
    formatTitleForURL,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  useEffect(() => {
    setArtistsPicIndex(1);
  }, [setArtistsPicIndex]);

  if (!artistData || artistData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='artists-header' id='artists-header'>
            <div className='artists-header-gradient-overlay' />
            <section className='artists-header-text-container'>
              <div className='artists-brand-container'>
                <h1 className='artists-brand-title'>ARTISTS</h1>
                <p className='artists-tagline'>
                  Celebrating talent, nurturing visionaries, and amplifying
                  voices around the world.
                </p>
              </div>
            </section>
            <section className='artists-header-pics-container'>
              <Skeleton className='header-skeleton' />
            </section>
          </header>
          <Banner />
          <section className='loading-content-container'>
            <div className='loading-content'>
              <div className='skeleton-artist-cards'>
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className='skeleton-artist-card'>
                      <div className='skeleton-artist-image'>
                        <Skeleton height={200} width={200} />
                        <div className='circular-progress-container'>
                          <CircularProgress
                            size={40}
                            sx={{
                              color: 'var(--clr-divider)',
                            }}
                          />
                        </div>
                      </div>
                      <div className='skeleton-artist-name-container'>
                        <Skeleton
                          width={200}
                          height={20}
                          className='skeleton-artist-name'
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <div className='gap' />
        </main>
      </>
    );
  }

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='artists-header' id='artists-header'>
          <div className='artists-header-gradient-overlay' />
          <section className='artists-header-text-container'>
            <div className='artists-brand-container'>
              <h1 className='artists-brand-title'>ARTISTS</h1>
              <p className='artists-tagline'>
                Celebrating talent, nurturing visionaries, and amplifying voices
                around the world.
              </p>
            </div>
          </section>
          <Slideshow
            data={artistData}
            index={artistsPicIndex}
            setIndex={setArtistsPicIndex}
            slideClass='artists'
          />
        </header>
        <Banner />
        <section className='artists-content-container'>
          <div className='artists-content'>
            {artistData.map((artist, index) => (
              <div
                key={index}
                className='artist-card'
                onClick={() =>
                  handleLinkClick(`/artists/${formatTitleForURL(artist.name)}`)
                }
              >
                <div className='artist-img-container'>
                  <img
                    src={artist.img || noUserImg}
                    alt={artist.name}
                    className='artist-img'
                    loading='lazy'
                  />
                </div>
                <p className='artist-name'>{artist.name}</p>
              </div>
            ))}
          </div>
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default Artists;
