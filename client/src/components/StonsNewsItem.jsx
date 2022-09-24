import React from "react";
import dayjs from "dayjs";
//dayjs relative time plugin

const StonsNewsItem = (props) => {
  console.log(props);

  return (
    <div className="mb-6 flex cursor-pointer flex-row overflow-hidden rounded border-2 border-gray-200 py-2">
      <img
        src={props.image ? props.image : "../../public/new-logo.svg"}
        className="ml-3 h-16 w-16 rounded-sm"
      />
      <div className="mx-3 text-base">
        {props.title}
        <p className="pt-1 text-xs text-gray-800">
          {props.author} | {dayjs(props.datePublished).format("MMM D, YYYY")}
          {/* published date with dayjs in the form of 16 hours ago */}
        </p>
      </div>
    </div>
  );
};

export default StonsNewsItem;
