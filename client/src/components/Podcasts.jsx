import React from "react";

const Podcasts = () => {
  return (
    <div
      id="podcast-section"
      className="mx-3 my-4 flex flex-col rounded border border-gray-200 bg-white py-4 px-4 text-lg shadow-md sm:max-w-xl lg:max-w-xl"
    >
      <h2 id="podHeader" className="pb-4 text-lg font-semibold tracking-wide">
        Podcasts
      </h2>
      <iframe
        className="mb-6 cursor-pointer rounded border-2 border-gray-200"
        src="https://castbox.fm/app/castbox/player/id1078862?v=8.20.0&autoplay=0"
        width="100%"
        height={500}
        frameBorder={0}
      />
      <iframe
        className="mb-6 cursor-pointer rounded border-2 border-gray-200"
        src="https://castbox.fm/app/castbox/player/id2023142?v=8.20.0&autoplay=0"
        width="100%"
        height={500}
        frameBorder={0}
      />
      <iframe
        className="mb-6 cursor-pointer rounded border-2 border-gray-200"
        src="https://castbox.fm/app/castbox/player/id2413088?v=8.20.0&autoplay=0"
        width="100%"
        height={500}
        frameBorder={0}
      />
    </div>
  );
};

export default Podcasts;
