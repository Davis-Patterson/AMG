import {
  r as n,
  A as j,
  u as g,
  j as s,
  S as r,
  C as N,
} from './index-DnAeYVbS.js';
import { B as c, S as v } from './Slideshow-BcVBuuok.js';
function k() {
  const {
      darkMode: p,
      artistData: e,
      setShowSplash: l,
      artistsPicIndex: d,
      setArtistsPicIndex: i,
      noUserImg: o,
      formatTitleForURL: m,
    } = n.useContext(j),
    h = g(),
    x = (a) => {
      l(!0),
        setTimeout(() => {
          h(a);
        }, 200);
    };
  return (
    n.useEffect(() => {
      i(1);
    }, [i]),
    !e || e.length === 0
      ? s.jsx(s.Fragment, {
          children: s.jsxs('main', {
            className: 'page-container',
            id: 'page-container',
            children: [
              s.jsxs('header', {
                className: 'artists-header',
                id: 'artists-header',
                children: [
                  s.jsx('div', {
                    className: 'artists-header-gradient-overlay',
                  }),
                  s.jsx('section', {
                    className: 'artists-header-text-container',
                    children: s.jsxs('div', {
                      className: 'artists-brand-container',
                      children: [
                        s.jsx('h1', {
                          className: 'artists-brand-title',
                          children: 'ARTISTS',
                        }),
                        s.jsx('p', {
                          className: 'artists-tagline',
                          children:
                            'Celebrating talent, nurturing visionaries, and amplifying voices around the world.',
                        }),
                      ],
                    }),
                  }),
                  s.jsx('section', {
                    className: 'artists-header-pics-container',
                    children: s.jsx(r, { className: 'header-skeleton' }),
                  }),
                ],
              }),
              s.jsx(c, {}),
              s.jsx('section', {
                className: 'loading-content-container',
                children: s.jsx('div', {
                  className: 'loading-content',
                  children: s.jsx('div', {
                    className: 'skeleton-artist-cards',
                    children: Array(4)
                      .fill()
                      .map((a, t) =>
                        s.jsxs(
                          'div',
                          {
                            className: 'skeleton-artist-card',
                            children: [
                              s.jsxs('div', {
                                className: 'skeleton-artist-image',
                                children: [
                                  s.jsx(r, { height: 200, width: 200 }),
                                  s.jsx('div', {
                                    className: 'circular-progress-container',
                                    children: s.jsx(N, {
                                      size: 40,
                                      sx: { color: 'var(--clr-divider)' },
                                    }),
                                  }),
                                ],
                              }),
                              s.jsx('div', {
                                className: 'skeleton-artist-name-container',
                                children: s.jsx(r, {
                                  width: 200,
                                  height: 20,
                                  className: 'skeleton-artist-name',
                                }),
                              }),
                            ],
                          },
                          t
                        )
                      ),
                  }),
                }),
              }),
              s.jsx('div', { className: 'gap' }),
            ],
          }),
        })
      : s.jsx(s.Fragment, {
          children: s.jsxs('main', {
            className: 'page-container',
            id: 'page-container',
            children: [
              s.jsxs('header', {
                className: 'artists-header',
                id: 'artists-header',
                children: [
                  s.jsx('div', {
                    className: 'artists-header-gradient-overlay',
                  }),
                  s.jsx('section', {
                    className: 'artists-header-text-container',
                    children: s.jsxs('div', {
                      className: 'artists-brand-container',
                      children: [
                        s.jsx('h1', {
                          className: 'artists-brand-title',
                          children: 'ARTISTS',
                        }),
                        s.jsx('p', {
                          className: 'artists-tagline',
                          children:
                            'Celebrating talent, nurturing visionaries, and amplifying voices around the world.',
                        }),
                      ],
                    }),
                  }),
                  s.jsx(v, {
                    data: e,
                    index: d,
                    setIndex: i,
                    slideClass: 'artists',
                  }),
                ],
              }),
              s.jsx(c, {}),
              s.jsx('section', {
                className: 'artists-content-container',
                children: s.jsx('div', {
                  className: 'artists-content',
                  children: e.map((a, t) =>
                    s.jsxs(
                      'div',
                      {
                        className: 'artist-card',
                        onMouseDown: () => x(`/artists/${m(a.name)}`),
                        children: [
                          s.jsx('div', {
                            className: 'artist-img-container',
                            children: s.jsx('img', {
                              src: a.img || o,
                              alt: a.name,
                              className: 'artist-img',
                              loading: 'lazy',
                            }),
                          }),
                          s.jsx('p', {
                            className: 'artist-name',
                            children: a.name,
                          }),
                        ],
                      },
                      t
                    )
                  ),
                }),
              }),
              s.jsx('div', { className: 'gap' }),
            ],
          }),
        })
  );
}
export { k as default };
