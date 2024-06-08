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
  const { darkMode, newsData, formatTitleForURL } = useContext(AppContext);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (newsData.length > 0) {
      const foundNews = newsData.find(
        (item) => formatTitleForURL(item.title) === title
      );
      setArticle(foundNews);
    }
  }, [newsData, title, formatTitleForURL]);

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
            src={article.image}
            alt={article.title}
            className='article-header-pics'
          />
        </section>
      </header>
      <div className='article-detail-container' id='article-detail-container'>
        <div className='article-header-content'>
          <img
            src={article.image}
            alt={article.title}
            className='news-article-image'
            id='news-article-image'
          />
          <div className='article-title-container'>
            <h2 className='article-title'>{article.title}</h2>
            <p className='article-author'>By {article.author}</p>
            <p className='article-author'>{article.date}</p>
          </div>
        </div>
        <div className='article-text-content'>
          <p className='article-desc' id='article-desc'>
            {article.desc}
          </p>
        </div>
      </div>
      <div className='gap' />
    </main>
  );
}

export default Article;
