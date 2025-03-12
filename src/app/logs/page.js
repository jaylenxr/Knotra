'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getAllLogs } from '../../api/logData';
import LogCard from '../../components/LogCard';

function Logs() {
  const [logs, setLogs] = useState([]);

  const { user } = useAuth();

  const getAllTheLogs = () => {
    getAllLogs(user.uid).then(setLogs);
  };

  useEffect(() => {
    getAllTheLogs();
  });

  return (
    <div className="d-flex flex-wrap">
      {logs.map((log) => (
        <LogCard key={log.firebaseKey} logObj={log} onUpdate={getAllTheLogs} />
      ))}
    </div>
  );
}

export default Logs;
