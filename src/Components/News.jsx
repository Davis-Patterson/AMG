import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import Banner from 'utils/Banner';
import Slideshow from 'utils/Slideshow';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CircularProgress from '@mui/material/CircularProgress';
import 'styles/News.css';

function News() {
  const {
    newsData,
    newsIndex,
    setNewsIndex,
    amgBanner,
    handleLinkClick,
    formatTitleForURL,
  } = useContext(AppContext);

  const [sortOrder, setSortOrder] = useState('date-desc');
  const [sortedNews, setSortedNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (newsData) {
      const sortedData = [...newsData].sort((a, b) => {
        if (sortOrder === 'title-asc') {
          return a.title.localeCompare(b.title);
        } else if (sortOrder === 'title-desc') {
          return b.title.localeCompare(a.title);
        } else if (sortOrder === 'date-asc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortOrder === 'date-desc') {
          return new Date(b.date) - new Date(a.date);
        }
      });
      setSortedNews(sortedData);
      setNewsIndex(1);
    }
  }, [newsData, sortOrder]);

  if (!newsData || newsData.length === 0) {
    return (
      <>
        <main className='page-container' id='page-container'>
          <header className='news-header' id='about-header'>
            <div className='news-header-gradient-overlay' />
            <section className='news-header-text-container'>
              <div className='news-title-container'>
                <h1 className='news-title'>NEWS</h1>
                <p className='news-tagline'>
                  Shaping culture through the power of artistry.
                </p>
              </div>
            </section>
            <section className='news-header-pics-container'>
              <div className='news-header-pics-wrapper'>
                <div className='news-header-pic-wrapper'>
                  <img
                    src={onAirImg}
                    alt='current studio pic'
                    className='news-header-pic'
                  />
                </div>
              </div>
            </section>
          </header>
          <Banner data={amgBanner} slideClass={'amg'} />
          <section className='loading-content-container'>
            <div className='loading-content'>
              <div className='skeleton-article-cards'>
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className='skeleton-article-card'>
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
                        <div className='skeleton-button-shadow-container'>
                          <Skeleton
                            width={100}
                            height={30}
                            style={{ marginTop: 10 }}
                          />
                        </div>
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
        <header className='news-header' id='about-header'>
          <div
            className='news-header-gradient-overlay'
            id='news-header-gradient-overlay'
          />
          <section
            className='news-header-text-container'
            id='news-header-text-container'
          >
            <div className='news-title-container' id='news-title-container'>
              <h1 className='news-title' id='news-title'>
                NEWS
              </h1>
              <p className='news-tagline' id='news-tagline'>
                Shaping culture through the power of artistry.
              </p>
            </div>
          </section>
          <Slideshow
            data={sortedNews}
            index={newsIndex}
            setIndex={setNewsIndex}
            slideClass='news'
          />
        </header>
        <Banner data={amgBanner} slideClass={'amg'} />
        <div className='news-container-container' id='news-content-container'>
          <div className='filter-dropdown'>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value='date-asc'>Date ⇑</option>
              <option value='date-desc'>Date ⇓</option>
              <option value='title-asc'>Title ⇑</option>
              <option value='title-desc'>Title ⇓</option>
            </select>
          </div>
          <div className='news-content-container' id='news-content-container'>
            <div className='news-content'>
              {sortedNews.map((article) => (
                <div key={article.id} className='news-article'>
                  <img
                    src={article.img}
                    alt={article.title}
                    className='news-news-article-image'
                    id='news-news-article-image'
                    onMouseDown={(event) =>
                      handleLinkClick(
                        event,
                        `/news/${formatTitleForURL(article.title)}`
                      )
                    }
                  />
                  <div className='news-article-text'>
                    <div
                      onMouseDown={(event) =>
                        handleLinkClick(
                          event,
                          `/news/${formatTitleForURL(article.title)}`
                        )
                      }
                      className='news-article-title'
                    >
                      {article.title}
                    </div>
                    <p className='news-article-desc'>
                      {article.content[0].content}
                    </p>
                    <p className='news-article-author'>
                      By {article.author} on {article.date}
                    </p>
                    <div
                      onMouseDown={(event) =>
                        handleLinkClick(
                          event,
                          `/news/${formatTitleForURL(article.title)}`
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
          </div>
        </div>
        <div className='gap' />
      </main>
    </>
  );
}

export default News;
