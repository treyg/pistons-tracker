import React, { useEffect } from "react";
//import { useEffect, useState } from "react";
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
  //Function to sort the stats
  const filterStats = (stat) => {
    return neededStats
      .sort((a, b) => b[stat] - a[stat])
      .slice(0, 4)
      .map((player) => {
        return {
          statName: stat,
          name: player.name,
          stat: player[stat],
          headshot: player.headshot,
        };
      });
  };
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
  const leadersArr = [];
  statArr.map((stat) => {
    leadersArr.push(filterStats(stat));
  });

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Leaders</h2>
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
                  stat={leader.stat}
                  statName={leader.statName}
                  headshot={leader.headshot}
                />
                <div className="flex justify-between">
                  {runnersUp.map((runnerUp) => {
                    return (
                      <RunnerUp
                        key={runnerUp.stat}
                        name={runnerUp.name}
                        stat={runnerUp.stat}
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
