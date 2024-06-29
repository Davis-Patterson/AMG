import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from 'contexts/AppContext';
import Banner from 'utils/Banner';
import Slideshow from 'utils/Slideshow';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Artists.css';

function Artists() {
  const {
    artistData,
    amgBanner,
    artistsIndex,
    setArtistsIndex,
    noUserImg,
    handleLinkClick,
    formatTitleForURL,
  } = useContext(AppContext);

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedArtists, setSortedArtists] = useState([]);

  useEffect(() => {
    setArtistsIndex(1);
  }, [setArtistsIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (artistData) {
      const sortedData = [...artistData].sort((a, b) => {
        if (sortOrder === 'desc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      setSortedArtists(sortedData);
    }
  }, [artistData, sortOrder]);

  const getImgImg = (artist) => {
    if (artist.img && Array.isArray(artist.img)) {
      return artist.img[0]?.img || noUserImg;
    }
    return artist.img || noUserImg;
  };

  if (!artistData || artistData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='artists-header' id='artists-header'>
            <div className='artists-header-gradient-overlay' />
            <section className='artists-header-text-container'>
              <div className='artists-brand-container'>
                <h1 className='artists-title-title'>ARTISTS</h1>
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
          <Banner data={amgBanner} slideClass={'amg'} />
          <section className='loading-content-container'>
            <div className='loading-content'>
              <div className='skeleton-artist-cards'>
                {Array(6)
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
          <div
            className='artists-header-gradient-overlay'
            id='artists-header-gradient-overlay'
          />
          <section className='artists-header-text-container'>
            <div
              className='artists-brand-container'
              id='artists-brand-container'
            >
              <h1 className='artists-title-title' id='artists-title-title'>
                ARTISTS
              </h1>
              <p className='artists-tagline'>
                Celebrating talent, nurturing visionaries, and amplifying voices
                around the world.
              </p>
            </div>
          </section>
          <Slideshow
            data={sortedArtists}
            index={artistsIndex}
            setIndex={setArtistsIndex}
            slideClass='artists'
          />
        </header>
        <Banner data={sortedArtists} slideClass={'artists'} />
        <section
          className='artists-content-container'
          id='artists-content-container'
        >
          <div className='filter-dropdown'>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value='asc'>Name ⇑</option>
              <option value='desc'>Name ⇓</option>
            </select>
          </div>
          <div className='artists-content' id='artists-content'>
            {sortedArtists.map((artist, index) => (
              <a
                href={`/artists/${formatTitleForURL(artist.name)}`}
                key={index}
                className='artist-card'
                id='artist-card'
                onMouseDown={(event) =>
                  handleLinkClick(
                    event,
                    `/artists/${formatTitleForURL(artist.name)}`
                  )
                }
              >
                <div className='artist-img-container' id='artist-img-container'>
                  <img
                    src={getImgImg(artist)}
                    alt={artist.name}
                    className='artist-img'
                    id='artist-img'
                    loading='lazy'
                  />
                </div>
                <div className='artist-name-container'>
                  <p className='artist-name' id='artist-name'>
                    {artist.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
        <div className='gap' />
      </main>
    </>
  );
}

export default Artists;
