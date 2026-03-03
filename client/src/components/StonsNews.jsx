import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";
import StonsNewsItem from "./StonsNewsItem";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const StonsNews = () => {
  const [news, setFullNews] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      const newsRef = ref(db, "news");
      onValue(newsRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.articles) {
          setFullNews(data.articles);
          setFetchedAt(data.fetchedAt || null);
        } else {
          setFullNews([]);
        }
        setLoading(false);
      });
    };
    fetchNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-3 my-4 flex flex-col gap-3 rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Stons News</h2>
            {fetchedAt && (
              <span className="text-xs text-gray-400">
                Updated {dayjs(fetchedAt).fromNow()}
              </span>
            )}
          </div>
          {news.length > 0 ? (
            news.map((article) => (
              <StonsNewsItem
                key={article.url}
                link={article.url}
                title={article.title}
                author={article.source || "Unknown"}
                datePublished={article.publishedAt || null}
                image={article.image || ""}
                description={article.description || ""}
              />
            ))
          ) : (
            <p>No news articles available</p>
          )}
        </div>
      )}
    </>
  );
};

export default StonsNews;
