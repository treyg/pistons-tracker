import React, { useState, useEffect } from "react";
import StatLeaders from "./StatLeaders";
import Roster from "./Roster";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";

const Stats = () => {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoster = () => {
      setLoading(true);
      const playerRef = ref(db, "roster/players");
      onValue(playerRef, (snapshot) => {
        const fullRoster = snapshot.val();
        setRoster(fullRoster);
        setLoading(false);
      });
    };
    fetchRoster();
  }, []);

  return (
    <div className="dark:text-gray-300">
      <StatLeaders leaders={roster} />
      <Roster roster={roster} />
    </div>
  );
};

export default Stats;
