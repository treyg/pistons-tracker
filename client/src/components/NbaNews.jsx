import React, { useState, useEffect } from "react";
import getLeagueNews from "../api/getLeagueNews";
import NbaNewsItem from "./NbaNewsItem";

const NbaNews = () => {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const response = await getLeagueNews();
    setNews(response.articles);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Top Stories</h2>
      {news.map((article) => (
        <NbaNewsItem
          key={article.published}
          link={article.links.web.href}
          headline={article.headline}
          captions={article.images[0].caption}
          description={article.description}
          byline={article.byline}
          links={article.links}
          image={article.images[0].url}
          datePublished={article.lastModified}
        />
      ))}
    </section>
  );
};

export default NbaNews;
