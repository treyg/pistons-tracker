import React from "react";
import Leader from "./Leader";
import RunnerUp from "./RunnerUp";

const StatLeaders = (props) => {
  const leaders = props.leaders;

  const neededStats = [];
  Object.entries(leaders).map(([key, value]) => {
    if (value.stats) {
      neededStats.push({
        name: key,
        ppg: value.stats.pts,
        rpg: value.stats.reb,
        stl: value.stats.stl,
        ft_pct: value.stats.ft_pct,
        ast: value.stats.ast,
        blk: value.stats.blk,
        fg_pct: value.stats.fg_pct,
        fg3_pct: value.stats.fg3_pct,
        fg3m: value.stats.fg3m,
        headshot: value.headshot,
      });
    }
  });
  const statArr = [
    "ppg",
    "rpg",
    "stl",
    "ft_pct",
    "ast",
    "blk",
    "fg_pct",
    "fg3_pct",
    "fg3m",
  ];
  const statNames = [
    "Points Per Game",
    "Rebounds Per Game",
    "Steals Per Game",
    "Free Throw Percentage",
    "Assists Per Game",
    "Blocks Per Game",
    "Field Goal Percentage",
    "3 Point Percentage",
    "3 Pointers Made Per Game",
  ];

  const byOneHundred = [
    "Free Throw Percentage",
    "Field Goal Percentage",
    "3 Point Percentage",
  ];

  //Function to sort the stats
  const filterStats = (stat) => {
    return neededStats
      .sort((a, b) => b[stat] - a[stat])
      .slice(0, 4)
      .map((player) => {
        return {
          statName: statNames[statArr.indexOf(stat)],
          name: player.name,
          stat: player[stat],
          headshot: player.headshot,
        };
      });
  };

  const leadersArr = [];
  statArr.map((stat) => {
    leadersArr.push(filterStats(stat));
  });
  console.log(leadersArr);

  return (
    <>
      <section className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leadersArr.map((stat) => {
          const leader = stat[0];
          const runnersUp = stat.slice(1, 4);
          if (leader) {
            return (
              <article className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
                <Leader
                  key={leader.stat}
                  name={leader.name}
                  stat={
                    byOneHundred.includes(leader.statName)
                      ? (leader.stat * 100).toFixed(1) + "%"
                      : leader.stat
                  }
                  statName={leader.statName}
                  headshot={leader.headshot}
                />
                <div className="flex justify-between">
                  {runnersUp.map((runnerUp) => {
                    return (
                      <RunnerUp
                        key={runnerUp.stat}
                        name={runnerUp.name}
                        stat={
                          byOneHundred.includes(runnerUp.statName)
                            ? (runnerUp.stat * 100).toFixed(1) + "%"
                            : runnerUp.stat
                        }
                        headshot={runnerUp.headshot}
                      />
                    );
                  })}
                </div>
              </article>
            );
          }
        })}
      </section>
    </>
  );
};

export default StatLeaders;
