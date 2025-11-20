import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";

const Stats = () => {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'pts', direction: 'desc' });

  useEffect(() => {
    const fetchRoster = () => {
      setLoading(true);
      const playerRef = ref(db, "roster/players");
      onValue(playerRef, (snapshot) => {
        const fullRoster = snapshot.val();
        // Convert object to array for easier sorting
        const playersArray = Object.values(fullRoster || {});
        setRoster(playersArray);
        setLoading(false);
      });
    };
    fetchRoster();
  }, []);

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedPlayers = () => {
    const sortedPlayers = [...roster].sort((a, b) => {
      const aValue = a.stats?.[sortConfig.key] ?? 0;
      const bValue = b.stats?.[sortConfig.key] ?? 0;
      
      if (sortConfig.direction === 'asc') {
        return aValue - bValue;
      }
      return bValue - aValue;
    });
    return sortedPlayers;
  };

  const formatStat = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') return value.toFixed(1);
    return value;
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined || value === 0) return '-';
    return (value * 100).toFixed(1) + '%';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl dark:text-gray-300">Loading stats...</div>
      </div>
    );
  }

  const sortedPlayers = getSortedPlayers();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6">Player Stats</h1>
      
      <div className="overflow-x-auto bg-white dark:bg-stons-black rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                Player
              </th>
              <th onClick={() => handleSort('pts')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                PTS {sortConfig.key === 'pts' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('reb')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                REB {sortConfig.key === 'reb' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('ast')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                AST {sortConfig.key === 'ast' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('stl')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                STL {sortConfig.key === 'stl' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('blk')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                BLK {sortConfig.key === 'blk' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('fg_pct')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                FG% {sortConfig.key === 'fg_pct' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('fg3_pct')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                3P% {sortConfig.key === 'fg3_pct' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('ft_pct')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                FT% {sortConfig.key === 'ft_pct' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
              <th onClick={() => handleSort('fg3m')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                3PM {sortConfig.key === 'fg3m' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-stons-black divide-y divide-gray-200 dark:divide-gray-700">
            {sortedPlayers.map((player, index) => (
              <tr key={player.name} className={index % 2 === 0 ? 'bg-white dark:bg-stons-black' : 'bg-gray-50 dark:bg-gray-900'}>
                <td className="sticky left-0 z-10 bg-inherit px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={player.headshot}
                      alt={player.name}
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                      onError={(e) => {
                        e.target.src = '../../bball-placeholder.jpg';
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {player.position} • #{player.number}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.pts)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.reb)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.ast)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.stl)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.blk)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatPercentage(player.stats?.fg_pct)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatPercentage(player.stats?.fg3_pct)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatPercentage(player.stats?.ft_pct)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {formatStat(player.stats?.fg3m)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;
