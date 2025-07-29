import { useState, useEffect } from "react";
import axios from "axios";

import "./APINews.css"; 

function APINews() {
  // --------create component for news using props
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=bee637f53a7d4283b2ee7e8d800d2c07"
        );

        setNews(response.data.articles); 
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);

   const filteredNews = news.filter((article) =>
    (article.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (article.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (article.source?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="news-container">
    <h4>API News</h4>
    <div className="search-box">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search news..."
          className="search-input"
        />
      </div>
    <div className="news-grid">

    
    
    
    {filteredNews.length > 0 ? ( filteredNews.map((article, index) => (
      <div key={index} className="news-item">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <a href={article.url} target="_blank">
          {article.source.name}
        </a>
        <img src={article.urlToImage} alt={article.title} style={{ width: '100%', height: 'auto' }} />  
      </div>
    ))):(
            <p>No news found</p>)}
    </div>
  </div>
  );
}

export default APINews;
