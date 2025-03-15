'use client';

import { useAuth } from '@/utils/context/authContext';
import React, { useState, useEffect, useCallback } from 'react';
import LogCard from '../../../components/LogCard';
import { getLogsByUid } from '../../../api/logData';

function Profile() {
  const { user } = useAuth();
  const [currentLogs, setCurrentLogs] = useState([]);

  const getCurrentLogs = useCallback(() => {
    getLogsByUid(user.uid).then(setCurrentLogs);
  }, [user.uid]);

  useEffect(() => {
    getCurrentLogs();
  }, [getCurrentLogs]);

  return (
    <div className="profile-container">
      <h3 className="profile-title">My Logs</h3>
      <div className="profile-grid">{currentLogs.length === 0 ? <h5 className="no-logs">No current logs</h5> : currentLogs.map((log) => <LogCard key={log.firebaseKey} logObj={log} onUpdate={getCurrentLogs} />)}</div>
    </div>
  );
}

export default Profile;
