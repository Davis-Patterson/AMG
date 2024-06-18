import { r, A as h, u as m, j as e, S as a, C as x } from './index-DnAeYVbS.js';
import { o as c } from './on-air-CIQ4qGUt.js';
function g() {
  const {
      darkMode: j,
      newsData: n,
      setShowSplash: l,
      formatTitleForURL: i,
    } = r.useContext(h),
    d = m();
  r.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const t = (s) => {
    l(!0),
      setTimeout(() => {
        d(s);
      }, 200);
  };
  return !n || n.length === 0
    ? e.jsx(e.Fragment, {
        children: e.jsxs('main', {
          className: 'page-container',
          id: 'page-container',
          children: [
            e.jsxs('header', {
              className: 'news-header',
              id: 'about-header',
              children: [
                e.jsx('div', { className: 'news-header-gradient-overlay' }),
                e.jsx('div', { className: 'news-header-gradient-overlay' }),
                e.jsx('section', {
                  className: 'news-header-text-container',
                  children: e.jsxs('div', {
                    className: 'news-title-container',
                    children: [
                      e.jsx('h1', {
                        className: 'news-title',
                        children: 'NEWS',
                      }),
                      e.jsx('p', {
                        className: 'news-tagline',
                        children:
                          'Shaping culture through the power of artistry.',
                      }),
                    ],
                  }),
                }),
                e.jsx('section', {
                  className: 'news-header-pics-container',
                  children: e.jsx('img', {
                    src: c,
                    alt: 'current studio pic',
                    className: 'news-header-pics',
                  }),
                }),
              ],
            }),
            e.jsx('section', {
              className: 'loading-content-container',
              children: e.jsx('div', {
                className: 'loading-content',
                children: e.jsx('div', {
                  className: 'skeleton-article-cards',
                  children: Array(4)
                    .fill()
                    .map((s, o) =>
                      e.jsxs(
                        'div',
                        {
                          className: 'skeleton-article-card',
                          children: [
                            e.jsxs('div', {
                              className: 'skeleton-article-image',
                              children: [
                                e.jsx(a, { height: 150, width: 150 }),
                                e.jsx('div', {
                                  className: 'circular-progress-container',
                                  children: e.jsx(x, {
                                    size: 40,
                                    sx: { color: 'var(--clr-divider)' },
                                  }),
                                }),
                              ],
                            }),
                            e.jsxs('div', {
                              className: 'skeleton-article-content',
                              children: [
                                e.jsx('div', {
                                  className: 'skeleton-shadow-container',
                                  children: e.jsx(a, {
                                    width: 300,
                                    height: 15,
                                    style: { marginBottom: 0 },
                                  }),
                                }),
                                e.jsx('div', {
                                  className: 'skeleton-shadow-container',
                                  children: e.jsx(a, {
                                    width: 300,
                                    height: 15,
                                    style: { marginBottom: 0 },
                                  }),
                                }),
                                e.jsx('div', {
                                  className: 'skeleton-shadow-container',
                                  children: e.jsx(a, {
                                    width: 300,
                                    height: 15,
                                    style: { marginBottom: 0 },
                                  }),
                                }),
                                e.jsx('div', {
                                  className: 'skeleton-button-shadow-container',
                                  children: e.jsx(a, {
                                    width: 100,
                                    height: 30,
                                    style: { marginTop: 10 },
                                  }),
                                }),
                              ],
                            }),
                          ],
                        },
                        o
                      )
                    ),
                }),
              }),
            }),
            e.jsx('div', { className: 'gap' }),
          ],
        }),
      })
    : e.jsx(e.Fragment, {
        children: e.jsxs('main', {
          className: 'page-container',
          id: 'page-container',
          children: [
            e.jsxs('header', {
              className: 'news-header',
              id: 'about-header',
              children: [
                e.jsx('div', { className: 'news-header-gradient-overlay' }),
                e.jsx('div', { className: 'news-header-gradient-overlay' }),
                e.jsx('section', {
                  className: 'news-header-text-container',
                  children: e.jsxs('div', {
                    className: 'news-title-container',
                    children: [
                      e.jsx('h1', {
                        className: 'news-title',
                        children: 'NEWS',
                      }),
                      e.jsx('p', {
                        className: 'news-tagline',
                        children:
                          'Shaping culture through the power of articlery.',
                      }),
                    ],
                  }),
                }),
                e.jsx('section', {
                  className: 'news-header-pics-container',
                  children: e.jsx('img', {
                    src: c,
                    alt: 'news header img',
                    className: 'news-header-pics',
                  }),
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'news-content-container',
              children: [
                e.jsx('div', { className: 'filter-controls-container' }),
                e.jsx('div', {
                  className: 'news-content',
                  children: n.map((s) =>
                    e.jsxs(
                      'div',
                      {
                        className: 'news-article',
                        children: [
                          e.jsx('img', {
                            src: s.image,
                            alt: s.title,
                            className: 'news-article-image',
                          }),
                          e.jsxs('div', {
                            className: 'news-article-text',
                            children: [
                              e.jsx('div', {
                                onMouseDown: () => t(`/news/${i(s.title)}`),
                                className: 'news-article-title',
                                children: s.title,
                              }),
                              e.jsx('p', {
                                className: 'news-article-desc',
                                children: s.desc,
                              }),
                              e.jsxs('p', {
                                className: 'news-article-author',
                                children: ['By ', s.author, ' on ', s.date],
                              }),
                              e.jsx('div', {
                                onMouseDown: () => t(`/news/${i(s.title)}`),
                                className: 'read-more-button',
                                children: 'Read More',
                              }),
                            ],
                          }),
                        ],
                      },
                      s.id
                    )
                  ),
                }),
              ],
            }),
            e.jsx('div', { className: 'gap' }),
          ],
        }),
      });
}
export { g as default };
