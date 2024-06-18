import { r as l, A as m, j as e } from './index-DnAeYVbS.js';
function x() {
  const { darkMode: d, locData: n } = l.useContext(m),
    [s, r] = l.useState(0),
    [i, o] = l.useState([]);
  l.useEffect(() => {
    o(n);
  }, []);
  const c = (t) => {
    r(t);
  };
  return e.jsx(e.Fragment, {
    children: e.jsx('section', {
      className: 'location-container',
      children: e.jsxs('div', {
        className: 'about-location',
        children: [
          e.jsxs('div', {
            className: 'location-text-container',
            children: [
              e.jsx('p', {
                className: 'location-text-title',
                children: 'LOCATIONS',
              }),
              e.jsx('p', {
                className: 'location-text',
                children: i[s] ? i[s].desc : '',
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'location-img-container',
            children: [
              e.jsx('div', { className: 'location-gradient' }),
              i.map((t, a) =>
                e.jsx(
                  'img',
                  {
                    src: t.img,
                    alt: `${t.id} img`,
                    className: 'location-img',
                    style: { display: s === a ? 'block' : 'none' },
                  },
                  a
                )
              ),
            ],
          }),
          e.jsx('div', {
            className: 'location-button-container',
            children: i.map((t, a) =>
              e.jsxs(
                'div',
                {
                  className: `location-button ${s === a ? 'selected' : ''}`,
                  onMouseDown: () => c(a),
                  children: [
                    e.jsx('p', {
                      className: 'location-button-text',
                      children: t.id,
                    }),
                    s === a &&
                      e.jsxs('div', {
                        className: 'indicator',
                        children: [
                          e.jsx('div', { className: 'indicator-line' }),
                          e.jsx('div', { className: 'indicator-circle' }),
                        ],
                      }),
                  ],
                },
                a
              )
            ),
          }),
        ],
      }),
    }),
  });
}
function h() {
  const {
    darkMode: d,
    form: n,
    sending: s,
    success: r,
    error: i,
    handleChange: o,
    handleSubmit: c,
  } = l.useContext(m);
  return e.jsxs('form', {
    className: 'email-form-container',
    onSubmit: c,
    children: [
      e.jsx('label', { htmlFor: 'name', children: 'Name' }),
      e.jsx('input', {
        type: 'text',
        id: 'name',
        name: 'name',
        value: n.name,
        placeholder: 'Your Name',
        onChange: o,
        required: !0,
      }),
      e.jsx('label', { htmlFor: 'email', children: 'Email' }),
      e.jsx('input', {
        type: 'email',
        id: 'email',
        name: 'email',
        placeholder: 'YourName@email.com',
        value: n.email,
        onChange: o,
        required: !0,
      }),
      e.jsx('label', { htmlFor: 'message', children: 'Message' }),
      e.jsx('textarea', {
        id: 'message',
        name: 'message',
        placeholder: 'Your Message',
        value: n.message,
        onChange: o,
        required: !0,
      }),
      e.jsx('button', { type: 'submit', children: 'Submit' }),
    ],
  });
}
export { h as E, x as L };
