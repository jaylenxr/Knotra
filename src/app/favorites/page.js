'use client';

import React, { useEffect, useState } from 'react';
import { favoriteLogs } from '../../api/logData';
import LogCard from '../../components/LogCard';
import { useAuth } from '../../utils/context/authContext';

function ShowFavoriteLogs() {
  const [favoritedLogs, setFavoritedLogs] = useState([]);
  const { user } = useAuth([]);

  const getAllFavoriteLogs = () => {
    favoriteLogs(user.uid).then(setFavoritedLogs);
  };

  useEffect(() => {
    getAllFavoriteLogs();
  }, []);

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorite Logs</h3>
      <div className="favorites-grid">{favoritedLogs.length === 0 ? <h1 className="no-logs">No Favorite Logs</h1> : favoritedLogs.map((log) => <LogCard key={log.firebaseKey} logObj={log} />)}</div>
    </div>
  );
}
export default ShowFavoriteLogs;
