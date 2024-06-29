import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/Article.css';

function Article() {
  const { title } = useParams();
  const {
    newsData,
    noUserImg,
    handleLinkClick,
    formatTitleForURL,
    artworkOpen,
  } = useContext(AppContext);
  const [article, setArticle] = useState(null);
  const [recentNews, setRecentNews] = useState(null);

  useEffect(() => {
    if (newsData.length > 0) {
      const foundNews = newsData.find(
        (item) => formatTitleForURL(item.title) === title
      );
      setArticle(foundNews);
      const sortedData = newsData
        .filter((item) => formatTitleForURL(item.title) !== title)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);
      setRecentNews(sortedData);
    }
  }, [newsData, title, formatTitleForURL]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleArtworkOpen = (
    event,
    imgSrc,
    imgTitle = '',
    imgArtist = '',
    imgAlbum = ''
  ) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const artworkDetails = {
      src: imgSrc,
      alt: imgTitle,
      title: imgTitle,
      artist: imgArtist,
      album: imgAlbum,
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

  const getDescriptionText = (desc, attribution, date) => {
    if (!desc && !attribution && !date) return '';
    if (desc && !attribution && !date) return `${desc}`;
    if (desc && (attribution || date))
      return `${desc} - ${attribution || ''} ${date || ''}`.trim();
    return `${attribution || ''} ${date || ''}`.trim();
  };

  const getArtworkText = (desc, attribution, date, title) => {
    if (!desc && !attribution && !date) {
      return { artist: title, album: '' };
    }
    const artist = desc || '';
    const album = [attribution, date].filter(Boolean).join(' ') || '';
    return { artist, album };
  };

  if (!newsData || newsData.length === 0) {
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

  if (!article) {
    return (
      <main className='page-container' id='page-container'>
        <header className='temp-header' id='about-header'>
          <div className='temp-header-gradient-overlay' />
          <div className='temp-header-gradient-overlay' />
          <section className='temp-header-text-container'>
            <div className='temp-title-container'>
              <h1 className='temp-title'>Not Found</h1>
              <p className='temp-tagline'>
                Unfortunately, we cannot find the article that you're looking
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
      <header className='article-header' id='article-header'>
        <section className='article-header-pics-container'>
          <img
            src={article.img}
            alt={article.title}
            className='article-header-pics'
            onMouseDown={(event) =>
              handleArtworkOpen(
                event,
                article.img,
                article.title,
                '',
                article.title
              )
            }
          />
        </section>
      </header>
      <section
        className='article-detail-container'
        id='article-detail-container'
      >
        <div className='article-header-content'>
          <img
            src={article.img}
            alt={article.title}
            className='news-article-image'
            id='news-article-image'
            onMouseDown={(event) =>
              handleArtworkOpen(
                event,
                article.img,
                article.title,
                '',
                article.title
              )
            }
          />
          <div className='article-title-container'>
            <h2 className='article-title' id='article-title'>
              {article.title}
            </h2>
            <p className='article-author'>By {article.author}</p>
            <p className='article-author'>{article.date}</p>
          </div>
        </div>
        <div className='article-text-content'>
          {article.content.map((section) => {
            const { artist, album } = getArtworkText(
              section.desc,
              section.attribution,
              section.date,
              article.title
            );
            return (
              <div key={section.section}>
                {section.img && (
                  <div className='article-section-image-container'>
                    <img
                      src={section.img}
                      alt={section.desc || article.title}
                      className='article-section-image'
                      onMouseDown={(event) =>
                        handleArtworkOpen(event, section.img, '', artist, album)
                      }
                    />
                  </div>
                )}
                <p className='image-description'>
                  {getDescriptionText(
                    section.desc,
                    section.attribution,
                    section.date
                  )}
                </p>
                <p className='article-section-text'>{section.content}</p>
              </div>
            );
          })}
        </div>
        {article.artist && article.artist.length > 0 && (
          <div className='article-artist-container'>
            <h3 className='section-title'>Artist</h3>
            {article.artist.map((artistItem, index) => (
              <div key={index} className='article-artist'>
                <img
                  src={artistItem.img || noUserImg}
                  alt={artistItem.name}
                  className='article-artist-image'
                  onMouseDown={(event) =>
                    handleLinkClick(
                      event,
                      `/artists/${formatTitleForURL(artistItem.name)}`
                    )
                  }
                />
                <div className='article-artist-content'>
                  <h4
                    className='article-artist-name'
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/artists/${formatTitleForURL(artistItem.name)}`
                      )
                    }
                  >
                    {artistItem.name}
                  </h4>
                  <p className='article-artist-bio'>{artistItem.bio}...</p>
                  <div
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/artists/${formatTitleForURL(artistItem.name)}`
                      )
                    }
                    className='show-more-button'
                  >
                    <span>
                      <p className='show-more-button-text'>Show More</p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='other-news-container'>
          <h3 className='section-title'>Other News</h3>
          {recentNews &&
            recentNews.map((newsItem) => (
              <div
                key={newsItem.id}
                className='recent-news-article'
                id='recent-news-article'
              >
                <div
                  className='recent-news-article-image-container'
                  id='recent-news-article-image-container'
                >
                  <img
                    src={newsItem.img}
                    alt={newsItem.title}
                    className='recent-news-article-image'
                    id='recent-news-article-image'
                    onMouseDown={(event) =>
                      handleArtworkOpen(
                        event,
                        newsItem.img,
                        newsItem.title,
                        newsItem.author,
                        newsItem.date
                      )
                    }
                  />
                </div>
                <div className='recent-news-article-text'>
                  <div
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/news/${formatTitleForURL(newsItem.title)}`
                      )
                    }
                    className='recent-news-article-title'
                    id='recent-news-article-title'
                  >
                    {newsItem.title}
                  </div>
                  <p className='recent-news-article-desc'>
                    {newsItem.content[0].content}
                  </p>
                  <p className='recent-news-article-author'>
                    By {newsItem.author} on {newsItem.date}
                  </p>
                  <div
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/news/${formatTitleForURL(newsItem.title)}`
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
        </div>
      </section>
      <div className='gap' />
    </main>
  );
}

export default Article;
