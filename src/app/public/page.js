'use client';

import React, { useEffect, useState } from 'react';
import { getPublicLogs } from '../../api/logData';
import LogCard from '../../components/LogCard';

export default function ShowPublicLogs() {
  const [publicLogs, setPublicLogs] = useState([]);

  const getAllPublicLogs = async () => {
    const getThePublicLogs = await getPublicLogs();
    setPublicLogs(getThePublicLogs);
  };

  useEffect(() => {
    getAllPublicLogs();
  }, []);

  return (
    <div className="logs-page">
      <h3>Public Logs</h3>
      <div className="logs-list">{publicLogs.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>No Public Logs</h1> : publicLogs.map((log) => <LogCard key={log.firebaseKey} logObj={log} />)}</div>
    </div>
  );
}
