import React from "react";
import dayjs from "dayjs";

const NextFive = (props) => {
  const futureFive = props.nextFive.events
    .filter((event) => {
      return dayjs(event.date).isAfter(dayjs());
    })
    .slice(0, 5);

  return (
    <section className="mx-3 my-4 flex flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black">
      <h2 className="mb-5 text-xl font-semibold">
        Upcoming Games
        <span className="font-normal">{`- ${props.nextFive.season?.name}`}</span>
      </h2>
      <div className="flex flex-col gap-3">
        {futureFive.map((game) => (
          <div
            key={game.id}
            className="align-center flex justify-between rounded border-2 border-gray-200 px-2 py-2 dark:border-gray-700"
          >
            <div className="w-4/5">
              <div className="flex flex-row py-1 text-base">
                <img
                  src={game.competitions[0].competitors[0].team.logos[0].href}
                  className="mr-2 h-6 w-6"
                />
                <span>
                  {game.competitions[0].competitors[0].team.shortDisplayName}
                </span>
              </div>
              <div className="flex flex-row py-1 text-base">
                <img
                  src={game.competitions[0].competitors[1].team.logos[0].href}
                  className="mr-2 h-6 w-6"
                />
                <span>
                  {game.competitions[0].competitors[1].team.shortDisplayName}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-16 border-l pl-2 text-center text-xs">
                {dayjs(game.date).format("ddd M/D @ h:mm")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextFive;
