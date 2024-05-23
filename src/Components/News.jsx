import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import onAirImg from 'assets/News/on-air.jpg';
import 'styles/News.css';

function News() {
  const { darkMode, news, setShowSplash } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLinkClick = (path) => {
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  return (
    <>
      <main className='page-container' id='page-container'>
        <header className='news-header' id='about-header'>
          <div className='news-header-gradient-overlay' />
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
            <img
              src={onAirImg}
              alt='current studio pic'
              className='news-header-pics'
            />
          </section>
        </header>
        <div className='news-content-container'>
          <div className='filter-controls-container'></div>
          <div className='news-content'>
            {news.map((article) => (
              <div key={article.id} className='news-article'>
                <img
                  src={article.image}
                  alt={article.title}
                  className='news-article-image'
                />
                <div className='news-article-text'>
                  <div
                    onClick={() => handleLinkClick(`/news/${article.id}`)}
                    className='news-article-title'
                  >
                    {article.title}
                  </div>
                  <p className='news-article-desc'>{article.desc}</p>
                  <p className='news-article-author'>
                    By {article.author} on {article.date}
                  </p>
                  <div
                    onClick={() => handleLinkClick(`/news/${article.id}`)}
                    className='read-more-button'
                  >
                    Read More
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='gap' />
      </main>
    </>
  );
}

export default News;
