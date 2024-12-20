import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";
import StonsNewsItem from "./StonsNewsItem";

const StonsNews = () => {
  const [news, setFullNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      const newsRef = ref(db, "news/articles");
      onValue(newsRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.value) {
          setFullNews(data.value);
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
                title={article.name}
                author={article.provider[0]?.name || "Unknown"}
                datePublished={article.datePublished}
                image={article.image?.thumbnail?.contentUrl || ""}
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
