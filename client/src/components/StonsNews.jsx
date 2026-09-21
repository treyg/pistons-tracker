import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import { getStonsNews } from "../api/stonsApi";
import StonsNewsItem from "./StonsNewsItem";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const StonsNews = () => {
  const { data, isLoading } = useQuery(["stonsNews"], getStonsNews, {
    staleTime: 5 * 60 * 1000,
  });
  const news = data?.articles ?? [];
  const fetchedAt = data?.fetchedAt ?? null;

  return (
    <>
      {isLoading ? (
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
