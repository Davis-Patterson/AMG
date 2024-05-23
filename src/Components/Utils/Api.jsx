import newsData from '/src/Utilities/News.json';

// export const fetchNews = async () => {
//   const response = await fetch({ newsData });
//   const data = await response.json();
//   return data;
// };

export const fetchNews = async () => {
  // Return a promise that resolves with the news data
  return Promise.resolve(newsData);
};
