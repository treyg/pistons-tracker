import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const StonsNewsItem = (props) => {
  return (
    <a
      href={props.link}
      className="mb-6 flex cursor-pointer flex-row overflow-hidden rounded border-2 border-gray-200 py-2"
    >
      <img
        src={props.image ? props.image : "../../new-logo.png"}
        className="ml-3 h-16 w-16 rounded-sm"
      />
      <div className="mx-3 text-base">
        {props.title}
        <p className="pt-1 text-xs text-gray-800">
          {props.author} | {dayjs(props.datePublished).fromNow(true) + " ago"}
        </p>
      </div>
    </a>
  );
};

export default StonsNewsItem;
