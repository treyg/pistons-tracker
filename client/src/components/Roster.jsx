import React from "react";
import RosterPlayer from "./RosterPlayer";

const Roster = (props) => {
  const roster = props.roster;
  return (
    <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Full Roster</h2>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.values(roster).map((player) => (
          <RosterPlayer
            key={player.name}
            headshot={player.headshot}
            playerName={player.name
              .replace(/%20/g, " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            position={player.position}
          />
        ))}
      </ul>
    </section>
  );
};

export default Roster;
