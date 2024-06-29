import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import Media from 'utils/Media';
import Icon from 'utils/Icon';
import onAirImg from 'assets/News/on-air.jpg';
import Skeleton from 'react-loading-skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Artist.css';

function Artist() {
  const { name } = useParams();
  const {
    darkMode,
    artistData,
    noUserImg,
    handleLinkClick,
    formatTitleForURL,
    artworkOpen,
  } = useContext(AppContext);
  const [artist, setArtist] = useState(null);
  const [bioReadMore, setBioReadMore] = useState(false);

  const icons = {
    apple: 'apple',
    facebook: 'facebook',
    instagram: 'instagram',
    spotify: 'spotify',
    twitter: 'twitter',
    youtube: 'youtube',
    soundcloud: 'soundcloud',
  };

  useEffect(() => {
    if (artistData.length > 0) {
      const foundArtist = artistData.find(
        (artist) => formatTitleForURL(artist.name) === name
      );
      setArtist(foundArtist);
    }
  }, [artistData, name, formatTitleForURL]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReadMore = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setBioReadMore(true);
  };

  const toggleReadMore = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    setBioReadMore(!bioReadMore);
  };

  const handleArtworkOpen = (event, imgSrc) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const artworkDetails = {
      src: imgSrc,
      alt: artist.name,
      title: artist.name,
      artist: '',
      album: '',
      date: '',
      explicit: false,
    };

    artworkOpen(
      event,
      artworkDetails.src,
      artworkDetails.alt,
      artworkDetails.title,
      artworkDetails.artist,
      artworkDetails.album,
      artworkDetails.date,
      artworkDetails.explicit
    );
  };

  const getBannerOrImg = (artist) => {
    if (
      artist.banner &&
      Array.isArray(artist.banner) &&
      artist.banner[0]?.img
    ) {
      return artist.banner[0].img;
    } else if (artist.img && Array.isArray(artist.img) && artist.img[0]?.img) {
      return artist.img[0].img;
    }
    return noUserImg;
  };

  const getImgImg = (artist) => {
    if (artist.img && Array.isArray(artist.img) && artist.img[0]?.img) {
      return artist.img[0].img;
    } else if (
      artist.banner &&
      Array.isArray(artist.banner) &&
      artist.banner[0]?.img
    ) {
      return artist.banner[0].img;
    }
    return noUserImg;
  };

  const getBannerAlign = (artist) => {
    if (artist.banner && Array.isArray(artist.banner)) {
      return artist.banner[0]?.align || 'center';
    }
    return 'center';
  };

  const getLinks = (artist, darkMode) => {
    if (artist.links && Array.isArray(artist.links)) {
      return Object.keys(icons).map(
        (key) =>
          artist.links[0][key] && (
            <a
              key={key}
              href={artist.links[0][key]}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon
                name={icons[key]}
                svgClass='artist-social-icon'
                id='artist-social-icon'
              />
            </a>
          )
      );
    }
    return null;
  };

  if (!artistData || artistData.length === 0) {
    return (
      <main className='page-container' id='page-container'>
        <header
          className='artists-header'
          id='artists-header'
          style={{ width: '100%', height: '400px' }}
        >
          <section
            className='artists-header-pics-container'
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <Skeleton className='header-skeleton' width='100%' height='100%' />
            <div className='circular-progress-overlay'>
              <CircularProgress
                size={40}
                sx={{ color: 'var(--clr-divider)' }}
              />
            </div>
          </section>
        </header>
        <section className='loading-content-container'>
          <div className='loading-content'>
            <div className='skeleton-article-cards'>
              <div className='skeleton-article-card'>
                <div
                  className='skeleton-article-image'
                  style={{ position: 'relative' }}
                >
                  <Skeleton height={150} width={150} />
                  <div className='circular-progress-overlay'>
                    <CircularProgress
                      size={40}
                      sx={{ color: 'var(--clr-divider)' }}
                    />
                  </div>
                </div>
                <div className='skeleton-article-content'>
                  {[...Array(6)].map((_, i) => (
                    <Skeleton
                      key={i}
                      width={300}
                      height={15}
                      style={{ marginBottom: 0 }}
                    />
                  ))}
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
        <header className='temp-header' id='about-header'>
          <div className='temp-header-gradient-overlay' />
          <section className='temp-header-text-container'>
            <div className='temp-title-container'>
              <h1 className='temp-title'>Not Found</h1>
              <p className='temp-tagline'>
                Unfortunately, we cannot find the artist that you're looking
                for.
              </p>
            </div>
          </section>
          <section className='temp-header-pics-container'>
            <img
              src={onAirImg}
              alt='current studio pic'
              className='temp-header-pics'
            />
          </section>
        </header>
      </main>
    );
  }

  return (
    <main className='page-container' id='page-container'>
      <header className='artist-header' id='artist-header'>
        <section className='artist-header-pics-container'>
          <img
            src={getBannerOrImg(artist)}
            alt={artist.name}
            className='artist-header-pics'
            style={{ objectPosition: getBannerAlign(artist) }}
            onMouseDown={(event) =>
              handleArtworkOpen(event, getBannerOrImg(artist))
            }
          />
        </section>
      </header>
      <section
        className='artist-detail-title-container'
        id='artist-detail-title-container'
      >
        <div className='artist-title-content'>
          <img
            src={getImgImg(artist)}
            alt={artist.name}
            className='artist-image'
            id='artist-image'
            onMouseDown={(event) => handleArtworkOpen(event, getImgImg(artist))}
          />
          <div className='artist-title-container'>
            <h2 className='artist-title' id='artist-title'>
              {artist.name}
            </h2>
            <div className='artist-social-icons'>{getLinks(artist)}</div>
          </div>
        </div>
        <section className='artist-detail-content' id='artist-detail-content'>
          <div className='artist-bio-container' id='artist-bio'>
            <h3 className='section-title'>Bio</h3>
            <div className='section-text-container'>
              <div
                className={`${
                  bioReadMore ? 'text-gradient-hidden' : 'text-gradient-shown'
                }`}
              />
              <p
                className={`${
                  bioReadMore
                    ? 'artist-bio-text-expanded'
                    : 'artist-bio-text-hidden'
                }`}
                onMouseDown={(event) => handleReadMore(event)}
              >
                {artist.bio}
              </p>
            </div>
            <div
              onMouseDown={(event) => toggleReadMore(event)}
              className='show-more-text-button'
            >
              <span>
                <p className='show-more-text-button-text'>
                  {bioReadMore ? 'show less' : 'show more'}
                </p>
              </span>
            </div>
          </div>
          <div className='artist-other' id='artist-other'>
            {artist.management && artist.management.length > 0 && (
              <>
                <h3 className='section-title'>Management</h3>
                {artist.management.map((manager, index) => (
                  <div key={index} className='manager-container'>
                    <p className='artist-management' id='artist-management'>
                      {manager.name}
                    </p>
                    <p
                      className='artist-management-email'
                      id='artist-management'
                    >
                      {manager.email}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
        <Media artist={artist} />
        {artist.news && artist.news.length > 0 && (
          <section className='artist-news'>
            <h3 className='section-title'>News</h3>
            {artist.news.map((news, index) => (
              <div
                key={index}
                className='artist-news-article'
                id='artist-news-article'
              >
                <img
                  src={news.img}
                  alt={news.title}
                  className='artist-news-article-image'
                  onMouseDown={(event) =>
                    handleLinkClick(
                      event,
                      `/news/${formatTitleForURL(news.title)}`
                    )
                  }
                />
                <div className='artist-news-article-content'>
                  <h4
                    className='artist-news-article-title'
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/news/${formatTitleForURL(news.title)}`
                      )
                    }
                  >
                    {news.title}
                  </h4>
                  <p className='artist-news-article-desc'>
                    {news.content[0].content}
                  </p>
                  <p className='artist-news-article-date'>
                    By {news.author} on {news.date}
                  </p>
                  <div
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/news/${formatTitleForURL(news.title)}`
                      )
                    }
                    className='read-more-button'
                  >
                    <span>
                      <p className='read-more-button-text'>Read More</p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </section>
      <div className='gap' />
    </main>
  );
}

export default Artist;
