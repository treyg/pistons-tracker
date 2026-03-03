import React, { useState, useEffect } from "react";
import getLeagueNews from "../api/getLeagueNews";
import NbaNewsItem from "./NbaNewsItem";
import Loader from "./Loader";

const NbaNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await getLeagueNews();
        setNews(response?.articles ?? []);
      } catch (err) {
        console.error("Error fetching league news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section className="mx-3 my-4 flex h-max flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black dark:text-gray-300">
        <h2 className="mb-4 text-xl font-semibold">Top Stories</h2>
        <p className="text-gray-500">Unable to load league news right now.</p>
      </section>
    );
  }

  return (
    <section className="mx-3 my-4 flex h-max flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black dark:text-gray-300">
      <h2 className="mb-4 text-xl font-semibold">Top Stories</h2>
      {news.length > 0 ? (
        news.map((article) => (
          <NbaNewsItem
            key={article.published}
            link={article.links?.web?.href}
            headline={article.headline}
            captions={article?.images?.[0]?.caption}
            description={article.description}
            byline={article.byline}
            links={article.links}
            image={article?.images?.[0]?.url ?? "../../bball-placeholder.jpg"}
            datePublished={article.lastModified}
          />
        ))
      ) : (
        <p className="text-gray-500">No stories available right now.</p>
      )}
    </section>
  );
};

export default NbaNews;
