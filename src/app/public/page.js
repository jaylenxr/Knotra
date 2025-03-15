'use client';

import React, { useEffect, useState } from 'react';
import { getPublicLogs } from '../../api/logData';
import LogCard from '../../components/LogCard';

export default function ShowPublicLogs() {
  const [publicLogs, setPublicLogs] = useState([]);

  useEffect(() => {
    const getAllPublicLogs = async () => {
      const getThePublicLogs = await getPublicLogs();
      setPublicLogs(getThePublicLogs);
    };

    getAllPublicLogs();
  }, []);

  return (
    <div className="public-container">
      <h3 className="public-title">Public Logs</h3>
      <div className="public-grid">{publicLogs.length === 0 ? <h1 className="no-logs">No Public Logs</h1> : publicLogs.map((log) => <LogCard key={log.firebaseKey} logObj={log} />)}</div>
    </div>
  );
}
