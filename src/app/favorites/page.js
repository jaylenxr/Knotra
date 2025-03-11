'use client';

import React, { useEffect, useState } from 'react';
import { favoriteLogs } from '../../api/logData';
import LogCard from '../../components/LogCard';

export default function ShowFavoriteLogs() {
  const [favoritedLogs, setFavoritedLogs] = useState([]);

  useEffect(() => {
    const getAllFavoriteLogs = async () => {
      const getTheFavoriteLogs = await favoriteLogs();
      setFavoritedLogs(getTheFavoriteLogs);
    };

    getAllFavoriteLogs();
  }, []);

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorite Logs</h3>
      <div className="favorites-grid">{favoritedLogs.length === 0 ? <h1 className="no-logs">No Favorite Logs</h1> : favoritedLogs.map((log) => <LogCard key={log.firebaseKey} logObj={log} />)}</div>
    </div>
  );
}
