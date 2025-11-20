import React, { useState, useEffect } from "react";
import Roster from "./Roster";
import { ref, onValue } from "firebase/database";
import db from "../api/firebase";

const RosterPage = () => {
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

  if (loading) {
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
