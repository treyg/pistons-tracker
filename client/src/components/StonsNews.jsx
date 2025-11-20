import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";
import StonsNewsItem from "./StonsNewsItem";
import dayjs from "dayjs";

const StonsNews = () => {
  const [news, setFullNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      const newsRef = ref(db, "news");
      onValue(newsRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.articles) {
          setFullNews(data.articles);
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
          <h2 className="mb-5 text-xl font-semibold">Stons News</h2>
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
