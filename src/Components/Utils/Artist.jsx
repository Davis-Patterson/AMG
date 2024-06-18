import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import appleBlack from 'assets/Utils/apple-black.svg';
import appleWhite from 'assets/Utils/apple-white.svg';
import fBlack from 'assets/Utils/f-black.svg';
import fWhite from 'assets/Utils/f-white.svg';
import igBlack from 'assets/Utils/ig-black.svg';
import igWhite from 'assets/Utils/ig-white.svg';
import spotifyBlack from 'assets/Utils/spotify-black.svg';
import spotifyWhite from 'assets/Utils/spotify-white.svg';
import twitterxBlack from 'assets/Utils/twitterx-black.svg';
import twitterxWhite from 'assets/Utils/twitterx-white.svg';
import youtubeBlack from 'assets/Utils/youtube-black.svg';
import youtubeWhite from 'assets/Utils/youtube-white.svg';
import Skeleton from 'react-loading-skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Utils/Artist.css';

function Artist() {
  const { name } = useParams();
  const {
    darkMode,
    mute,
    artistData,
    noUserImg,
    handleLinkClick,
    formatTitleForURL,
  } = useContext(AppContext);
  const [artist, setArtist] = useState(null);
  const [bioReadMore, setBioReadMore] = useState(false);

  const navigate = useNavigate();

  const icons = {
    apple: darkMode ? appleWhite : appleBlack,
    facebook: darkMode ? fWhite : fBlack,
    instagram: darkMode ? igWhite : igBlack,
    spotify: darkMode ? spotifyWhite : spotifyBlack,
    twitter: darkMode ? twitterxWhite : twitterxBlack,
    youtube: darkMode ? youtubeWhite : youtubeBlack,
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

  if (!artistData || artistData.length === 0) {
    return (
      <main className='page-container' id='page-container'>
        <header className='artists-header' id='artists-header'>
          <section className='artists-header-pics-container'>
            <Skeleton className='header-skeleton' />
            <div className='circular-progress-container'>
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
                <div className='skeleton-article-image'>
                  <Skeleton height={150} width={150} />
                  <div className='circular-progress-container'>
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

  const headerImage = artist.banner || artist.img || noUserImg;

  return (
    <main className='page-container' id='page-container'>
      <header className='artist-header' id='artist-header'>
        <section className='artist-header-pics-container'>
          <img
            src={headerImage}
            alt={artist.name}
            className='artist-header-pics'
          />
        </section>
      </header>
      <section
        className='artist-detail-title-container'
        id='artist-detail-title-container'
      >
        <div className='artist-title-content'>
          <img
            src={artist.img || noUserImg}
            alt={artist.name}
            className='news-artist-image'
            id='news-artist-image'
          />
          <div className='artist-title-container'>
            <h2 className='artist-title' id='artist-title'>
              {artist.name}
            </h2>
            <div className='artist-social-icons'>
              {Object.keys(icons).map(
                (key) =>
                  artist[key] && (
                    <a
                      key={key}
                      href={artist[key]}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        src={icons[key]}
                        alt={key}
                        className='artist-social-icon'
                        id='artist-social-icon'
                      />
                    </a>
                  )
              )}
            </div>
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
        {artist.videos && artist.videos.length > 0 && (
          <section className='artist-content' id='artist-content'>
            <h3 className='section-title'>Media</h3>
            {artist.videos.map((video, index) => (
              <div key={index} className='video-container'>
                <video className='artist-video' autoPlay muted={mute} controls>
                  {video.videoSources.map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                  ))}
                  Your browser does not support the video tag.
                </video>
                <div className='video-title-artist-container'>
                  <p className='video-title-artist'>
                    {video.title} - {video.artist}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
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
                  src={news.image}
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
