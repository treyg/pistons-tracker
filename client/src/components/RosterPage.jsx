import React from "react";
import { useQuery } from "react-query";
import Roster from "./Roster";
import { getStonsRoster } from "../api/stonsApi";

const RosterPage = () => {
  const { data, isLoading } = useQuery(["stonsRoster"], getStonsRoster, {
    staleTime: 5 * 60 * 1000,
  });
  const roster = data?.players ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl dark:text-gray-300">Loading roster...</div>
      </div>
    );
  }

  return (
    <div className="dark:text-gray-300">
      <Roster roster={roster} />
    </div>
  );
};

export default RosterPage;
