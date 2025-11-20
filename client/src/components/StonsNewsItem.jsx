import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const StonsNewsItem = (props) => {
  const relativeTime = props.datePublished
    ? `${dayjs(props.datePublished).fromNow(true)} ago`
    : "Just now";

  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white/5 p-4 transition hover:border-blue-400 hover:bg-blue-50/10 dark:border-gray-800 dark:bg-stons-black/70 dark:hover:border-blue-500 dark:hover:bg-stons-black"
    >
      <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
        <img
          src={props.image ? props.image : "../../new-logo.png"}
          alt={props.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 text-left">
        <div className="text-sm font-semibold text-blue-600 dark:text-blue-300">
          {props.author} · {relativeTime}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {props.title}
        </h3>
        {props.description ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {props.description}
          </p>
        ) : null}
      </div>
    </a>
  );
};

export default StonsNewsItem;
