import newsData from '/src/Utilities/NewsData.json';
import homeData from '/src/Utilities/HomeData.json';
import studioData from '/src/Utilities/StudioData.json';
import artistData from '/src/Utilities/ArtistData.json';
import locData from '/src/Utilities/LocationData.json';

export const fetchNews = async () => {
  return Promise.resolve(newsData);
};

export const fetchHome = async () => {
  return Promise.resolve(homeData);
};

export const fetchStudio = async () => {
  return Promise.resolve(studioData);
};

export const fetchArtists = async () => {
  return Promise.resolve(artistData);
};

export const fetchLoc = async () => {
  return Promise.resolve(locData);
};
