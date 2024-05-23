export const fetchNews = async () => {
  const response = await fetch('/src/Utilities/News.json');
  const data = await response.json();
  return data;
};
