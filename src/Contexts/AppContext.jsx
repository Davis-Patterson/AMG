import React, { createContext, useState, useEffect } from 'react';
import { fetchNews } from 'utils/Api';
import useLocalStorageState from 'use-local-storage-state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorageState('darkMode', true);
  const [mute, setMute] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [news, setNews] = useState([]);

  const [homeIndex, setHomeIndex] = useState(0);
  const [aboutPicIndex, setAboutPicIndex] = useState(0);
  const [artistsPicIndex, setArtistsPicIndex] = useState(0);

  const homeData = [
    { title: 'Studer A827', img: 'https://i.imgur.com/QZb5qkH.jpeg' },
    { title: 'Lexicon 480L', img: 'https://i.imgur.com/b3os6DI.jpeg' },
    { title: 'API 1608 Control Room', img: 'https://i.imgur.com/42QeuF0.jpeg' },
    { title: 'SSL 4000G+', img: 'https://i.imgur.com/C4RFROH.jpeg' },
  ];

  const studioData = [
    { title: 'Lexicon 480L', img: 'https://i.imgur.com/b3os6DI.jpeg' },
    { title: 'API 1608 Control Room', img: 'https://i.imgur.com/42QeuF0.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/5UNtUH3.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/EUCcYJh.jpeg' },
    { title: 'Live Room', img: 'https://i.imgur.com/0tRM8gn.jpeg' },
    { title: 'Live Room', img: 'https://i.imgur.com/OmjVrom.jpeg' },
    { title: 'Production Suite', img: 'https://i.imgur.com/pLs2TXb.jpeg' },
    { title: 'Production Suite', img: 'https://i.imgur.com/VfnFTgL.jpeg' },
    { title: 'Neumann U 47', img: 'https://i.imgur.com/LWQPjtn.jpeg' },
    { title: 'S6L & Pro Tools', img: 'https://i.imgur.com/rKnZ633.jpeg' },
    { title: 'S6L', img: 'https://i.imgur.com/ql38mWm.jpeg' },
    { title: 'SSL 4000G+', img: 'https://i.imgur.com/lRUTAS2.jpeg' },
    { title: 'SSL 4000G+', img: 'https://i.imgur.com/C4RFROH.jpeg' },
    { title: 'SSL 4000G+ closeup', img: 'https://i.imgur.com/bZl9LRa.jpeg' },
    { title: 'SSL 4000G+ patchbay', img: 'https://i.imgur.com/PWDW6dP.jpeg' },
    { title: 'SSL 4000G+ faders', img: 'https://i.imgur.com/ecYZOGQ.jpeg' },
    { title: 'Outboard Gear', img: 'https://i.imgur.com/ZrcbpDn.jpeg' },
    { title: 'Control Room', img: 'https://i.imgur.com/AzVQbPA.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/IhLt3Yk.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/j20vH81.jpeg' },
    { title: 'Yamaha 02R', img: 'https://i.imgur.com/I2GrgOy.jpeg' },
    {
      title: 'Digidesign Control Room',
      img: 'https://i.imgur.com/tkpTHxb.jpeg',
    },
    { title: 'Audient ASP8024', img: 'https://i.imgur.com/y3xkJmG.jpeg' },
    { title: 'OP-6 Amp', img: 'https://i.imgur.com/1noSx2f.jpg' },
    { title: 'Studer A827', img: 'https://i.imgur.com/QZb5qkH.jpeg' },
  ];

  const artistsData = [
    {
      name: 'DJ Moonlight',
      img: 'https://i.imgur.com/FnyV0lA.jpeg',
      bio: 'DJ Moonlight, a trailblazing figure in the electronic music scene, has captivated audiences worldwide with his unique soundscapes and electrifying performances. Born and raised in Berlin, he started his journey as a classical pianist before discovering his passion for electronic music. His sets blend deep house, techno, and ambient music, creating an immersive experience that transports listeners to another realm. With over a decade of experience, DJ Moonlight has played at some of the most prestigious festivals and clubs around the globe, including Tomorrowland, Coachella, and Berghain. His innovative approach to music production has earned him numerous awards and accolades, solidifying his status as a pioneer in the industry.',
    },
    {
      name: 'Lily Sterling',
      img: 'https://i.imgur.com/g0UZimv.jpeg',
      bio: "Lily Sterling is a singer-songwriter whose soulful voice and heartfelt lyrics have resonated with fans across the world. Growing up in Nashville, Tennessee, she was surrounded by music from a young age, learning to play the guitar and piano by the time she was ten. Her music blends elements of country, folk, and pop, creating a sound that is both timeless and contemporary. Lily's debut album, 'Whispers in the Wind,' received critical acclaim for its raw emotion and lyrical depth. She has toured extensively, sharing stages with renowned artists like Taylor Swift and Kacey Musgraves. Known for her authenticity and vulnerability, Lily continues to inspire her fans with her powerful storytelling and captivating performances.",
    },
    {
      name: 'Aerotype Productions',
      img: 'https://i.imgur.com/uJHbdvZ.png',
      bio: "Aerotype Productions is a hit producer known for his innovative approach to music production and sound design. Producer James 'Aerotype' Smith has revolutionized the electronic music landscape with his genre-defying tracks. His music combines elements of hip-hop, EDM, and cinematic soundscapes, creating an audio-visual experience that is both captivating and immersive. Aerotype Productions has collaborated with top artists like Kendrick Lamar, Skrillex, and The Weeknd, contributing to some of the biggest hits in recent years. His work has been featured in blockbuster films, video games, and major advertising campaigns, making him a household name in the industry. With a commitment to pushing the boundaries of music and technology, Aerotype Productions continues to set new standards in the world of sound.",
    },
    {
      name: 'Don L',
      img: 'https://i.imgur.com/UqmbO5f.jpeg',
      bio: "Don L, born Donald Ladon in Reno, NV, is a versatile artist whose music spans across indie rock, folk, and hip-hop. His ability to blend these genres seamlessly has set him apart in the music industry. Donald began his career in the underground rap scene, quickly gaining recognition for his unique sound, his breakthrough mixtape, 'Rise of the Don,' highlighted his genre-blending talent. He has toured the world, gracing the stages of renowned festivals such as SXSW, Lollapalooza, and Glastonbury. His dynamic performances and charismatic stage presence have earned him a loyal fan base and critical acclaim. Throughout his career, Don L has received numerous awards for his innovative albums. His dedication to his craft and his ability to connect with listeners on a profound level make him a standout figure in the music world.",
    },
  ];

  const locData = [
    {
      id: 'New York',
      desc: 'Headquartered in the vibrant heart of New York City, the epicenter of music and entertainment, our global footprint includes strategically located offices worldwide. By fostering innovation at the intersection of music and technology, each location is dedicated to providing exceptional service and support, ensuring we remain at the forefront of the industry.',
      img: 'https://i.imgur.com/rseDwDZ.jpeg',
    },
    {
      id: 'Miami',
      desc: 'Situated in the vibrant and culturally diverse city of Miami, our office thrives in one of the most influential music hubs in the world. Known for its rich blend of musical genres and a thriving nightlife, Miami is a breeding ground for innovation at the intersection of music and technology. Our Miami team is dedicated to providing exceptional service and support, ensuring we remain at the forefront of the industry within this dynamic landscape.',
      img: 'https://i.imgur.com/moeFGfL.jpeg',
    },
    {
      id: 'Los Angeles',
      desc: 'Based in the dynamic and influential city of Los Angeles, our office is located in the heart of the entertainment industry. Renowned for its legendary music scene and home to countless iconic artists and venues, Los Angeles is a pivotal center for musical innovation and creativity. Our LA team is committed to delivering exceptional service and support, ensuring we stay ahead in this ever-evolving industry.',
      img: 'https://i.imgur.com/kGz09mw.jpeg',
    },
    {
      id: 'London',
      desc: "Located in the dynamic and culturally rich city of London, our office is strategically positioned in one of the world's leading hubs for music and entertainment. With a focus on driving innovation at the intersection of music and technology, our London team is committed to delivering exceptional service and support, ensuring we lead the industry globally.",
      img: 'https://i.imgur.com/oQqU0ZJ.jpeg',
    },
    {
      id: 'Tokyo',
      desc: 'Positioned in the bustling and innovative city of Tokyo, our office is at the heart of a major global music and entertainment hub. Embracing the fusion of music and technology, our Tokyo team is committed to offering exceptional service and support, ensuring we continue to lead the industry worldwide.',
      img: 'https://i.imgur.com/uVMAL9H.jpeg',
    },
    {
      id: 'Sydney',
      desc: 'Located in the lively and picturesque city of Sydney, our office is strategically placed in a key center for music and entertainment. With a strong emphasis on pioneering advancements in music and technology, our Sydney team is dedicated to delivering outstanding service and support, keeping us at the cutting edge of the industry.',
      img: 'https://i.imgur.com/wMCjAjB.jpeg',
    },
  ];

  const formatTitleForURL = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
    };

    getNews();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showSplash,
        setShowSplash,
        darkMode,
        setDarkMode,
        mute,
        setMute,
        dropdown,
        setDropdown,
        news,
        homeIndex,
        setHomeIndex,
        aboutPicIndex,
        setAboutPicIndex,
        artistsPicIndex,
        setArtistsPicIndex,
        homeData,
        studioData,
        artistsData,
        locData,
        formatTitleForURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
