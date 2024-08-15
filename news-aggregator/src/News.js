

// src/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fallbackImage = 'https://via.placeholder.com/300'; // Fallback image URL

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=f399be55c62144d5b596ccd0cb407cdb`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;

  return (
    <div>
      <h1>Top Headlines</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <img
              src={article.urlToImage || fallbackImage}
              alt={article.title}
              onError={(e) => (e.target.src = fallbackImage)}
              style={{ maxWidth: '100%' }}
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
