import React, { useEffect } from 'react';

function Home({ darkMode, activeSection, setActiveSection }) {
  useEffect(() => {
    if (activeSection) {
      window.history.pushState(null, null, `#${activeSection}`);
    }
  }, [activeSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default Home;
