import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const NbaNewsArticle = (props) => {
  return (
    <article className="mb-6 flex cursor-pointer flex-col overflow-hidden rounded border-2">
      <a href={props.link}>
        <figure>
          <img
            className="w-full rounded-sm"
            src={props.image}
            alt={props.caption}
          />
        </figure>
        <div className="my-3 mx-4" key={props.published}>
          <figcaption>
            <h3 className="text-lg font-medium">{props.headline}</h3>
          </figcaption>
          <p className="mt-2 text-sm">{props.description}</p>
          <p className="mt-3 text-xs">
            {props?.byline ? props.byline : "ESPN"} |{" "}
            {dayjs(props?.datePublished).fromNow(true) + " ago"}
          </p>
        </div>
      </a>
    </article>
  );
};

export default NbaNewsArticle;
