import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import onAirImg from 'assets/News/on-air.jpg';
import 'styles/Article.css';

function Article() {
  const { id } = useParams();
  const { news } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const article = news.find((item) => item.id.toString() === id);

  if (!article) {
    return (
      <main className='page-container' id='page-container'>
        <header className='news-header' id='about-header'>
          <div className='news-header-gradient-overlay' />
          <div className='news-header-gradient-overlay' />
          <section className='news-header-text-container'>
            <div className='news-title-container'>
              <h1 className='news-title'>Not Found</h1>
              <p className='news-tagline'>
                Unfortunately, we cannot find the article you're looking for.
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
      <header className='article-header' id='about-header'>
        <div className='article-header-gradient-overlay' />
        <section className='article-header-pics-container'>
          <img
            src={article.image}
            alt={article.title}
            className='article-header-pics'
          />
        </section>
      </header>
      <div className='article-detail-container'>
        <div className='article-header-content'>
          <img
            src={article.image}
            alt={article.title}
            className='news-article-image'
          />
          <div className='article-title-container'>
            <h2 className='article-title'>{article.title}</h2>
            <p className='article-author'>By {article.author}</p>
            <p className='article-author'>{article.date}</p>
          </div>
        </div>
        <div className='article-text-content'>
          <p className='article-desc'>{article.desc}</p>
        </div>
      </div>
      <div className='gap' />
    </main>
  );
}

export default Article;
