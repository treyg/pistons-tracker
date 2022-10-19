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
    <section className="mx-3 my-4 flex h-max flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black dark:text-gray-300">
      <h2 className="mb-4 text-xl font-semibold">Top Stories</h2>
      {news.map((article) => (
        <NbaNewsItem
          key={article.published}
          link={article.links.web.href}
          headline={article.headline}
          captions={article?.images[0]?.caption}
          description={article.description}
          byline={article.byline}
          links={article.links}
          image={article?.images[0]?.url ?? "../../bball-placeholder.jpg"}
          datePublished={article.lastModified}
        />
      ))}
    </section>
  );
};

export default NbaNews;
